/**
 * @file script.js
 * @description Lógica principal para el simulador de aspersor 2D.
 * Gestiona la inicialización del canvas, la simulación de partículas de agua,
 * el ciclo de riego automatizado basado en cultivos, y la interacción con el panel de control.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- Base de Datos de Cultivos ---
    // Define los parámetros para cada tipo de cultivo.
    // power: Potencia de riego (afecta la velocidad de las partículas).
    // duration: Duración en segundos de la fase de riego.
    // frequency: Duración en segundos de la fase de espera antes del siguiente riego.
    const CULTIVO_PRESETS = {
        arroz: { nombre: "Arroz", power: 60, duration: 20, frequency: 180 },
        papa:  { nombre: "Papa", power: 80, duration: 15, frequency: 120 },
        fresa: { nombre: "Fresa", power: 40, duration: 10, frequency: 60 },
        maiz: { nombre: "Maíz", power: 70, duration: 25, frequency: 240 },
        tomate: { nombre: "Tomate", power: 50, duration: 15, frequency: 90 },
        lechuga: { nombre: "Lechuga", power: 30, duration: 5, frequency: 45 }
    };

    // --- Obtener Elementos del DOM ---
    const canvas = document.getElementById('sprinkler-canvas');
    const ctx = canvas.getContext('2d');

    const seedSelector = document.getElementById('seed-selector');
    const startAngleSlider = document.getElementById('start-angle-slider');
    const endAngleSlider = document.getElementById('end-angle-slider');
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const resetButton = document.getElementById('reset-button');

    const startAngleValue = document.getElementById('start-angle-value');
    const endAngleValue = document.getElementById('end-angle-value');

    const statusSeed = document.getElementById('status-seed');
    const statusMode = document.getElementById('status-mode');
    const statusTimer = document.getElementById('status-timer');
    const statusAngle = document.getElementById('status-angle');
    const statusPressure = document.getElementById('status-pressure');
    const statusHumidity = document.getElementById('status-humidity');
    const statusEnergy = document.getElementById('status-energy');

    // --- Estado Global de la Simulación ---
    // Objeto que almacena todas las variables clave que cambian durante la ejecución.
    const state = {
        startAngle: 0,       // Ángulo inicial del barrido.
        endAngle: 90,        // Ángulo final del barrido.
        power: 0,            // Potencia actual, definida por el cultivo.
        currentAngle: 0,     // El ángulo visual actual del aspersor.
        targetAngle: 0,      // El ángulo hacia el que se mueve el aspersor.
        isCycleActive: false,// Flag para saber si el ciclo principal está activo.
        currentMode: 'stopped', // Estado actual: 'stopped', 'watering', or 'waiting'.
        sweepDirection: 1,   // Dirección del barrido (1 para adelante, -1 para atrás).
        rotationSpeed: 0.5,  // Velocidad de rotación del aspersor.
        lastAngle: 0,        // Última posición angular para cálculos de velocidad.
        mainIntervalId: null,// ID del intervalo principal que gestiona los ciclos.
        countdown: 0,        // Contador para las fases de riego y espera.
        soilHumidity: 0,     // Humedad actual del suelo (0-100).
        energyConsumption: 0,// Consumo energético acumulado (en Wh).
    };

    // --- Variables de Simulación ---
    let particles = [];      // Array para almacenar las partículas de agua.
    let plants = [];         // Array para almacenar las plantas.
    let dirtPattern = null; // Patrón de tierra para el fondo del canvas.

    // --- Funciones del Canvas y Simulación ---

    /**
     * Crea un patrón de tierra procedural para usar como fondo del canvas.
     * @returns {CanvasPattern} - El patrón de tierra generado.
     */
    function createDirtPattern() {
        const patternCanvas = document.createElement('canvas');
        const patternCtx = patternCanvas.getContext('2d');
        patternCanvas.width = 100;
        patternCanvas.height = 100;

        // Colores de tierra
        const dirtColors = ['#8B4513', '#A0522D', '#654321', '#D2691E'];

        for (let i = 0; i < 10000; i++) {
            const x = Math.random() * patternCanvas.width;
            const y = Math.random() * patternCanvas.height;
            const color = dirtColors[Math.floor(Math.random() * dirtColors.length)];
            patternCtx.fillStyle = `${color}${Math.floor(Math.random() * 100 + 155).toString(16)}`; // Color con alpha aleatorio
            patternCtx.fillRect(x, y, 2, 2);
        }
        return ctx.createPattern(patternCanvas, 'repeat');
    }

    /**
     * Crea una nueva partícula de agua en la posición del aspersor.
     * Su velocidad y dirección se basan en el ángulo y potencia actuales.
     * @returns {object} - La nueva partícula con sus propiedades (x, y, vx, vy, etc.).
     */
    function createParticle() {
        const angleRad = (state.currentAngle - 90) * (Math.PI / 180);
        const spread = (Math.random() - 0.5) * (Math.PI / 36);
        const currentAngleRad = angleRad + spread;


        const minPower = 30;
        const maxPower = 80;
        const minVel = 4;
        const maxVel = 10;

        const velocity = minVel + ((state.power - minPower) / (maxPower - minPower)) * (maxVel - minVel) + Math.random() * 2;


        const fieldRadius = Math.min(canvas.width / 2, canvas.height / 2) * 0.9;


        const lifespan = fieldRadius / velocity;

        const angularVelocity = (state.currentAngle - state.lastAngle) * 0.1;

        return {
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: Math.cos(currentAngleRad) * velocity + angularVelocity,
            vy: Math.sin(currentAngleRad) * velocity,
            lifespan: lifespan,
            initialLifespan: lifespan,
        };
    }

    /**
     * Actualiza la posición de todas las partículas y las elimina si su vida útil ha terminado.
     * Si el aspersor está regando, crea nuevas partículas.
     */
    function updateParticles() {

        if (state.currentMode === 'watering') {
            for (let i = 0; i < 5; i++) {
                particles.push(createParticle());
            }
        }
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.lifespan--;
            if (p.lifespan <= 0) {
                particles.splice(i, 1);
                continue;
            }
            p.x += p.vx;
            p.y += p.vy;
        }
    }

    /**
     * Ajusta el tamaño del canvas para que coincida con el de su contenedor.
     * Se llama al inicio y cada vez que la ventana cambia de tamaño.
     */
    function resizeCanvas() {
        const container = document.getElementById('renderer-container');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        dirtPattern = createDirtPattern();
    }

    /**
     * Función principal de dibujado. Limpia y dibuja el canvas en cada frame.
     * Dibuja el fondo, el área de riego, las partículas y el aspersor.
     */
    function draw() {
        ctx.fillStyle = dirtPattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const fieldRadius = Math.min(centerX, centerY) * 0.9;
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, fieldRadius, 0, 2 * Math.PI);
        ctx.stroke();

        // --- Dibujar el arco del rango de riego ---
        const startRad = (state.startAngle - 90) * (Math.PI / 180);
        const endRad = (state.endAngle - 90) * (Math.PI / 180);

        ctx.fillStyle = 'rgba(0, 255, 255, 0.2)'; // Cian semi-transparente
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, fieldRadius, startRad, endRad);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // --- Dibujar Plantas ---
        drawPlants();

        particles.forEach(p => {
            const alpha = p.lifespan / p.initialLifespan;
            ctx.fillStyle = `rgba(173, 216, 230, ${alpha * 0.7})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        });

        const angleRad = (state.currentAngle - 90) * (Math.PI / 180);


        const sprinklerRadius = 10;
        const nozzleLength = 20;

        ctx.fillStyle = '#00ffff';
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(centerX, centerY, sprinklerRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;

        const endX = centerX + nozzleLength * Math.cos(angleRad);
        const endY = centerY + nozzleLength * Math.sin(angleRad);

        ctx.strokeStyle = '#1a1d2e';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }

    /**
     * Dibuja todas las plantas en el canvas.
     * La apariencia de cada planta depende de su tipo y etapa de crecimiento.
     */
    function drawPlants() {
        plants.forEach(p => {
            const size = (p.growthStage / 100) * 10 + 2; // Tamaño de 2 a 12

            // Colores basados en el tipo de cultivo
            switch (p.type) {
                case 'arroz': ctx.fillStyle = `rgba(144, 238, 144, ${p.growthStage / 100})`; break;
                case 'papa': ctx.fillStyle = `rgba(210, 180, 140, ${p.growthStage / 100})`; break;
                case 'fresa': ctx.fillStyle = `rgba(255, 105, 180, ${p.growthStage / 100})`; break;
                case 'maiz': ctx.fillStyle = `rgba(255, 255, 0, ${p.growthStage / 100})`; break;
                case 'tomate': ctx.fillStyle = `rgba(255, 99, 71, ${p.growthStage / 100})`; break;
                case 'lechuga': ctx.fillStyle = `rgba(0, 255, 0, ${p.growthStage / 100})`; break;
                default: ctx.fillStyle = 'white';
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, size / 2, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // --- Lógica Principal de la Aplicación ---

    /**
     * El bucle principal de animación, llamado en cada frame.
     * Gestiona la lógica de movimiento del aspersor y llama a las funciones
     * de actualización de partículas y de dibujado.
     */
    function animate() {
        state.lastAngle = state.currentAngle;

        // Mueve el aspersor solo si está en modo de riego
        if (state.currentMode === 'watering') {
            state.targetAngle += state.sweepDirection * state.rotationSpeed;

            // Invierte la dirección al alcanzar los límites


            if (state.sweepDirection === 1 && state.targetAngle >= state.endAngle) {
                state.targetAngle = state.endAngle;
                state.sweepDirection = -1;
            } else if (state.sweepDirection === -1 && state.targetAngle <= state.startAngle) {
                state.targetAngle = state.startAngle;
                state.sweepDirection = 1;
            }
        }

        // Suaviza el movimiento del aspersor
        state.currentAngle += (state.targetAngle - state.currentAngle) * 0.1;
        statusAngle.innerText = `${state.currentAngle.toFixed(1)}°`;

        updateParticles();
        draw();

        // Simular evaporación
        if (state.soilHumidity > 0) {
            state.soilHumidity -= 0.005; // Tasa de evaporación constante
        }

        requestAnimationFrame(animate);
    }

    /**
     * Actualiza la interfaz de usuario (el panel de control) para reflejar
     * el estado actual de la simulación.
     */
    function updateUI() {
        // Limpiar clases de estado anteriores
        statusMode.classList.remove('status-watering', 'status-waiting', 'status-stopped');

        switch (state.currentMode) {
            case 'watering':
                statusMode.innerText = 'Regando';
                statusMode.classList.add('status-watering');
                statusTimer.innerText = `${state.countdown}s`;
                break;
            case 'waiting':
                statusMode.innerText = 'En espera';
                statusMode.classList.add('status-waiting');
                statusTimer.innerText = `${state.countdown}s`;
                break;
            case 'stopped':
                statusMode.innerText = 'Detenido';
                statusMode.classList.add('status-stopped');
                statusTimer.innerText = 'N/A';
                statusSeed.innerText = 'Ninguno';

                // Resetear valores visuales al detener
                statusPressure.innerText = '0 kPa';
                statusHumidity.innerText = '0%';
                statusEnergy.innerText = '0 W';
                break;
        }

        // Actualizar siempre los nuevos campos
        const pressure = state.power * 1.5; // Fórmula de ejemplo
        statusPressure.innerText = `${pressure.toFixed(1)} kPa`;
        statusHumidity.innerText = `${state.soilHumidity.toFixed(1)}%`;
        statusEnergy.innerText = `${state.energyConsumption.toFixed(2)} Wh`;
    }

    /**
     * Gestiona la lógica principal del ciclo de riego. Alterna entre los modos
     * 'watering' y 'waiting' basándose en los presets del cultivo seleccionado.
     */
    function runCycle() {
        const selectedSeed = seedSelector.value;
        const preset = CULTIVO_PRESETS[selectedSeed];

        if (state.currentMode === 'watering') {

            state.currentMode = 'waiting';
            state.countdown = preset.frequency;
            particles = [];
        } else {

            state.currentMode = 'watering';
            state.countdown = preset.duration;
            statusSeed.innerText = preset.nombre;
            state.power = preset.power;


            const angleRange = Math.abs(state.endAngle - state.startAngle);
            const wateringDurationInSeconds = preset.duration;
            const framesPerSecond = 60;
            const totalFrames = wateringDurationInSeconds * framesPerSecond;


            const totalAngleToCover = angleRange * 4;

            if (totalFrames > 0 && angleRange > 0) {

                state.rotationSpeed = totalAngleToCover / totalFrames;
            } else {
                state.rotationSpeed = 0;
            }
        }
        updateUI();
    }

    /**
     * Inicia el ciclo principal de riego. Deshabilita los controles
     * y arranca el intervalo que gestiona el ciclo.
     */
    function startCycle() {
        if (state.isCycleActive) return;
        state.isCycleActive = true;

        startButton.disabled = true;
        stopButton.disabled = false;
        seedSelector.disabled = true;

        updateSweepAngles();
        plantCrops(); // <-- Planta los nuevos cultivos
        runCycle();

        state.mainIntervalId = setInterval(() => {
            state.countdown--;
            updateSimulationState(); // <-- Llamada a la nueva función
            if (state.countdown <= 0) {
                runCycle();
            }
            updateUI();
        }, 1000);
    }

    function updateSimulationState() {
        // Esta función se ejecutará cada segundo del ciclo.
        if (state.currentMode === 'watering') {
            // 1. Aumentar Humedad
            if (state.soilHumidity < 100) {
                state.soilHumidity += 0.5; // Tasa de absorción de agua
            }

            // 2. Calcular Consumo Energético
            // Consumo = Potencia (en W) * Tiempo (en h). Como es por segundo, dividimos por 3600.
            const powerInWatts = state.power * 10; // Factor de conversión de ejemplo
            state.energyConsumption += powerInWatts / 3600;
        }

        // 3. Gestionar Crecimiento de Plantas
        if (state.soilHumidity > 30) { // Umbral de humedad para crecer
            plants.forEach(p => {
                if (p.growthStage < 100) { // Límite de crecimiento
                    p.growthStage += 0.67; // Crecimiento para alcanzar el 100% en ~15 segundos (100 / 0.67 ≈ 150 frames)
                }
            });
        }
    }

    /**
     * Detiene el ciclo de riego actual. Limpia el intervalo,
     * reinicia el estado y habilita los controles.
     */
    function stopCycle() {
        if (!state.isCycleActive) return;
        state.isCycleActive = false;

        clearInterval(state.mainIntervalId);
        state.currentMode = 'stopped';
        particles = [];
        plants = []; // Limpiar plantas

        startButton.disabled = false;
        stopButton.disabled = true;
        seedSelector.disabled = false;

        updateUI();
    }

    /**
     * Restaura la configuración a sus valores por defecto.
     * Detiene el ciclo y resetea los sliders de ángulo.
     */
    function resetConfiguration() {
        stopCycle(); // Primero, nos aseguramos de que todo esté detenido.

        // Restaurar los sliders a sus valores por defecto
        state.startAngle = 0;
        state.endAngle = 90;

        startAngleSlider.value = state.startAngle;
        endAngleSlider.value = state.endAngle;

        startAngleValue.innerText = state.startAngle;
        endAngleValue.innerText = state.endAngle;

        // Apuntar el aspersor al ángulo de inicio
        state.targetAngle = state.startAngle;
    }

    /**
     * Asegura que el ángulo de inicio sea siempre menor o igual al de fin.
     * Si no lo es, los intercambia.
     */
    function updateSweepAngles() {
        if (state.startAngle > state.endAngle) {
            [state.startAngle, state.endAngle] = [state.endAngle, state.startAngle];
            startAngleSlider.value = state.startAngle;
            endAngleSlider.value = state.endAngle;
        }
        state.targetAngle = state.startAngle;
        state.currentAngle = state.startAngle;
    }

    /**
     * Crea y distribuye las plantas en el campo de riego al iniciar un ciclo.
     */
    function plantCrops() {
        plants = []; // Limpiar plantas anteriores
        const fieldRadius = Math.min(canvas.width / 2, canvas.height / 2) * 0.85;
        const startRad = (state.startAngle - 90) * (Math.PI / 180);
        const endRad = (state.endAngle - 90) * (Math.PI / 180);

        for (let i = 0; i < 10; i++) { // Plantar 10 cultivos
            const angle = startRad + Math.random() * (endRad - startRad);
            const radius = Math.random() * fieldRadius;

            plants.push({
                x: (canvas.width / 2) + Math.cos(angle) * radius,
                y: (canvas.height / 2) + Math.sin(angle) * radius,
                growthStage: 0, // Etapa de crecimiento inicial
                type: seedSelector.value,
            });
        }
    }

    // --- Event Listeners de la Interfaz ---
    // Asigna las funciones correspondientes a los eventos de los controles.

    startAngleSlider.addEventListener('input', (e) => {
        state.startAngle = parseInt(e.target.value, 10);
        startAngleValue.innerText = state.startAngle;
        if (!state.isCycleActive) state.targetAngle = state.startAngle;
    });

    endAngleSlider.addEventListener('input', (e) => {
        state.endAngle = parseInt(e.target.value, 10);
        endAngleValue.innerText = state.endAngle;
    });

    startButton.addEventListener('click', startCycle);
    stopButton.addEventListener('click', stopCycle);
    resetButton.addEventListener('click', resetConfiguration);


    /**
     * Función de inicialización. Se ejecuta una vez que el DOM está cargado.
     * Configura los listeners iniciales y arranca la animación.
     */
    function initialize() {
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        startAngleSlider.dispatchEvent(new Event('input'));
        endAngleSlider.dispatchEvent(new Event('input'));

        state.currentAngle = state.startAngle;
        state.targetAngle = state.startAngle;

        stopButton.disabled = true;

        updateUI();
        animate();
    }

    initialize();
});