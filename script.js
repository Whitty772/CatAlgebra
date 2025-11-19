// --- DATOS DEL QUIZ (40 PREGUNTAS EN TOTAL) ---
const quizData = {
    // 10 Preguntas FÁCILES: Conceptos Fundamentales
    EASY: [
        { question: "¿Cuál es el propósito principal de la Interpolación Polinomial?", options: ["Encontrar una función que pase exactamente por un conjunto de puntos de datos.", "Calcular la integral de una función desconocida.", "Simplificar ecuaciones diferenciales complejas.", "Determinar la derivada en puntos específicos."], correctIndex: 0 },
        { question: "¿Qué propiedad garantiza que un polinomio de grado 'n' pasa por 'n+1' puntos distintos?", options: ["Teorema de Rolle.", "Unicidad del polinomio interpolador.", "Teorema Fundamental del Álgebra.", "Método de Newton-Raphson."], correctIndex: 1 },
        { question: "Si tienes 3 puntos (x₀, x₁, x₂), ¿cuál es el grado máximo del polinomio interpolador?", options: ["Grado 3", "Grado 2", "Grado 4", "Grado 1"], correctIndex: 1 },
        { question: "¿Qué forma tiene el polinomio interpolador de Lagrange?", options: ["Una suma de términos que contienen diferencias divididas.", "Una suma de funciones base $L_i(x)$ ponderadas por los valores de la función $f(x_i)$.", "Una matriz de coeficientes.", "Un polinomio trigonométrico."], correctIndex: 1 },
        { question: "¿Para qué sirve el concepto de 'Diferencias Divididas' en la interpolación?", options: ["Para calcular integrales.", "Para obtener los coeficientes del polinomio de Newton.", "Para resolver sistemas de ecuaciones.", "Para determinar el error de aproximación."], correctIndex: 1 },
        { question: "¿Qué es el 'Error de Truncamiento' en la aproximación?", options: ["El error generado por la limitación de la precisión de la máquina.", "El error al truncar los datos de entrada.", "El error que resulta de usar una aproximación (como un polinomio) en lugar de la función exacta.", "El error debido a la mala elección de los nodos."], correctIndex: 2 },
        { question: "¿Cuál es un beneficio clave de usar la forma de Newton del polinomio interpolador?", options: ["Es computacionalmente más lento.", "Permite añadir nuevos nodos fácilmente sin recalcular todo.", "Solo funciona para funciones pares.", "Siempre tiene menos error que Lagrange."], correctIndex: 1 },
        { question: "¿Qué se busca en la 'Aproximación por Mínimos Cuadrados'?", options: ["Un polinomio que pase exactamente por todos los puntos.", "Un polinomio que minimice la suma de las diferencias absolutas.", "Una línea o curva que minimice la suma de los cuadrados de los errores.", "Un polinomio de grado $n$ para $n$ puntos."], correctIndex: 2 },
        { question: "Si la función real es $f(x)$ y el polinomio es $P(x)$, ¿cuál es la fórmula general del error?", options: ["$E(x) = f'(x) - P'(x)$", "$E(x) = f(x) + P(x)$", "$E(x) = |f(x) - P(x)|$", "$E(x) = f(x) * P(x)$"], correctIndex: 2 },
        { question: "¿Qué tipo de aproximación es adecuada cuando se tienen muchos datos con cierto ruido (dispersión)?", options: ["Interpolación de Lagrange.", "Interpolación de Hermite.", "Aproximación por Mínimos Cuadrados.", "Diferencias Divididas."], correctIndex: 2 }
    ],

    // 10 Preguntas MEDIAS: Aplicación y Comparación de Métodos
    MEDIUM: [
        { question: "¿Cuál es la principal desventaja computacional del método de Lagrange frente al de Newton?", options: ["Lagrange no puede interpolar funciones impares.", "Si se añade un nuevo punto, todo el polinomio de Lagrange debe ser recalculado desde cero.", "Lagrange requiere más memoria RAM.", "Lagrange solo funciona con nodos equidistantes."], correctIndex: 1 },
        { question: "¿Qué se requiere para que un conjunto de datos pueda ser interpolado por el método de Newton (Diferencias Divididas)?", options: ["Los nodos deben estar espaciados uniformemente.", "La función debe ser periódica.", "Los nodos deben ser distintos (no se requiere espaciado uniforme).", "Se requiere el conocimiento de las derivadas de la función."], correctIndex: 2 },
        { question: "Al usar interpolación inversa, ¿qué se busca?", options: ["Encontrar el valor de $y$ dado un valor de $x$.", "Encontrar el valor de $x$ dado un valor de $y$.", "Encontrar el polinomio derivado.", "Encontrar los nodos óptimos."], correctIndex: 1 },
        { question: "¿Qué representa el coeficiente $a_k$ en el polinomio de Newton?", options: ["El valor de la función en $x_k$.", "Una diferencia dividida de orden $k$.", "El error máximo de interpolación.", "El valor promedio de la función."], correctIndex: 1 },
        { question: "¿Cuál de estos métodos no requiere que los nodos sean equidistantes?", options: ["Lagrange y Newton.", "Diferencias Progresivas.", "Fórmulas de Stirling.", "Fórmulas de Bessel."], correctIndex: 0 },
        { question: "¿Cómo se construye un sistema de ecuaciones para encontrar los coeficientes de un polinomio en forma estándar ($P(x) = a_0 + a_1 x + \dots$)?", options: ["Usando la matriz identidad.", "Usando la matriz de Vandermonde.", "Usando el método de Gauss-Seidel.", "Usando la matriz Jacobiana."], correctIndex: 1 },
        { question: "¿Qué son los 'nodos' en el contexto de la interpolación?", options: ["Las raíces del polinomio.", "Los puntos de inflexión de la función.", "Los puntos de datos discretos $ (x_i, f(x_i)) $ que el polinomio debe atravesar.", "Los puntos donde el error es máximo."], correctIndex: 2 },
        { question: "¿Cuál es la relación entre el grado del polinomio de interpolación y el número de puntos usados?", options: ["Son siempre iguales.", "El grado es el doble del número de puntos.", "El grado máximo es $n-1$ para $n$ puntos.", "No hay relación directa."], correctIndex: 2 },
        { question: "En Mínimos Cuadrados, si usamos una recta ($y=a_0+a_1x$), ¿cuántas ecuaciones normales se deben resolver?", options: ["Una.", "Dos.", "Tres.", "Depende del número de puntos."], correctIndex: 1 },
        { question: "¿Cuándo es preferible el polinomio de Newton al de Lagrange?", options: ["Cuando la precisión no importa.", "Cuando se desea interpolar con pocos puntos.", "Cuando es posible que se necesite añadir más puntos de datos en el futuro.", "Nunca, Lagrange es siempre superior."], correctIndex: 2 }
    ],

    // 10 Preguntas DIFÍCILES: Análisis de Errores y Limitaciones
    HARD: [
        { question: "¿Cuál es la principal limitación de la interpolación polinomial con muchos puntos, especialmente en nodos equidistantes?", options: ["El método de Newton falla.", "La matriz de Vandermonde es fácil de invertir.", "El Fenómeno de Runge (grandes oscilaciones cerca de los extremos del intervalo).", "El error siempre es cero."], correctIndex: 2 },
        { question: "¿Qué se puede hacer para mitigar el Fenómeno de Runge en la interpolación?", options: ["Usar siempre nodos equidistantes.", "Usar polinomios de mayor grado.", "Usar nodos de Chebyshev o aproximación por Splines.", "Reducir la precisión de la máquina."], correctIndex: 2 },
        { question: "La cota superior del error de truncamiento en la interpolación depende de la derivada de la función, ¿de qué orden es esta derivada?", options: ["De orden 1 (la primera derivada).", "De orden $n$, donde $n$ es el grado del polinomio.", "De orden $n+1$, donde $n$ es el grado del polinomio.", "No depende de ninguna derivada."], correctIndex: 2 },
        { question: "¿Qué condición de suavidad se impone en un Spline Cúbico Natural en los puntos extremos?", options: ["La primera derivada es cero.", "La segunda derivada es cero.", "La tercera derivada es cero.", "La función es continua."], correctIndex: 1 },
        { question: "¿Qué son los 'Polinomios de Chebyshev' en el contexto de la interpolación?", options: ["Polinomios que minimizan el error en el punto central.", "Polinomios que maximizan el error.", "Polinomios ortogonales que se utilizan para elegir los nodos óptimos y minimizar el error máximo (Fenómeno de Runge).", "Polinomios que se usan solo para integrar."], correctIndex: 2 },
        { question: "En el error de Mínimos Cuadrados, la minimización se realiza sobre $\sum(y_i - f(x_i))^2$. ¿Qué representa $f(x_i)$?", options: ["El valor real de la función.", "El valor de la aproximación (la curva o recta) en el punto $x_i$.", "La derivada de la función.", "El error absoluto."], correctIndex: 1 },
        { question: "¿Por qué el sistema de ecuaciones normales de Mínimos Cuadrados es a menudo mejor condicionado que la matriz de Vandermonde?", options: ["Porque siempre es simétrico y definido positivo, lo que facilita la solución numérica.", "Porque tiene menos incógnitas.", "Porque siempre es una matriz diagonal.", "No lo es, es peor condicionado."], correctIndex: 0 },
        { question: "¿Qué es la 'Extrapolación' y cuál es su riesgo en la interpolación polinomial de alto grado?", options: ["Estimar el valor dentro del rango, el riesgo es nulo.", "Estimar el valor fuera del rango de los nodos, el riesgo es una gran inestabilidad y error.", "Ajustar la curva a los puntos, el riesgo es que el polinomio sea constante.", "Encontrar la derivada, el riesgo es la ambigüedad."], correctIndex: 1 },
        { question: "¿Qué diferencia a la Interpolación de Hermite de la de Lagrange?", options: ["Hermite solo usa los valores de la función, no las derivadas.", "Hermite interpola usando solo las derivadas.", "Hermite interpola tanto los valores de la función como los valores de su derivada en los nodos.", "Hermite solo funciona para polinomios de grado 1."], correctIndex: 2 },
        { question: "¿Qué problema puede surgir al usar Mínimos Cuadrados con un polinomio de grado demasiado alto?", options: ["Siempre se ajusta perfectamente a los datos.", "Suele causar el Fenómeno de Runge.", "Puede conducir a un sobreajuste ('overfitting') de los datos, ajustando el ruido en lugar de la tendencia.", "El error es siempre el de la máquina."], correctIndex: 2 }
    ],

    // 10 Preguntas EXTREMAS: Splines y Mínimos Cuadrados Avanzados
    VERY_HARD: [
        { question: "¿Cuál es el principal beneficio de usar 'Splines Cúbicos' sobre un solo polinomio de alto grado?", options: ["Reduce el número de cálculos.", "Garantiza la continuidad y la suavidad de las derivadas primera y segunda, eliminando las oscilaciones de Runge.", "Solo funciona para funciones lineales.", "No requiere el uso de nodos."], correctIndex: 1 },
        { question: "¿Qué significa que un Spline Cúbico tiene continuidad $C^2$?", options: ["La función es continua.", "La primera derivada es continua.", "La función, su primera y su segunda derivada son continuas en los nodos.", "Solo es continua en el primer y último punto."], correctIndex: 2 },
        { question: "¿Qué es un 'Spline Clamped' o Embridado?", options: ["Un spline donde todas las derivadas son cero.", "Un spline donde se especifican los valores de la primera derivada ($f'(x_0)$ y $f'(x_n)$) en los puntos extremos.", "Un spline que solo usa tres nodos.", "Un spline que no tiene segunda derivada continua."], correctIndex: 1 },
        { question: "En la aproximación de Mínimos Cuadrados, si queremos ajustar datos a una función exponencial $y = ae^{bx}$, ¿qué se debe hacer primero?", options: ["Usar interpolación de Lagrange.", "Linealizar la función tomando el logaritmo natural ($\ln y = \ln a + bx$).", "Usar una matriz de Vandermonde.", "Ajustar directamente con un polinomio."], correctIndex: 1 },
        { question: "¿Qué se entiende por 'ortogonalidad' en el contexto de la aproximación polinomial (por ejemplo, Polinomios de Legendre)?", options: ["Los polinomios son perpendiculares en el plano.", "Que la integral de su producto es cero bajo un cierto producto interior.", "Que la integral de su producto es cero bajo un cierto producto interior.", "Que solo tienen grados pares."], correctIndex: 1 },
        { question: "¿Cuál es la forma matricial del sistema de ecuaciones normales de Mínimos Cuadrados para una aproximación lineal?", options: ["$A\mathbf{x} = \mathbf{b}$ (donde $A$ es la matriz de Vandermonde).", "$A^T A \mathbf{c} = A^T \mathbf{y}$ (donde $\mathbf{c}$ son los coeficientes).", "Una matriz diagonal.", "Una matriz triangular superior."], correctIndex: 1 },
        { question: "¿Por qué se utiliza a menudo la Interpolación Cúbica de Hermite en gráficos por computadora y modelado CAD?", options: ["Porque es muy simple de calcular.", "Porque solo requiere un punto.", "Porque permite un control preciso sobre la posición y la dirección (tangente) de la curva en los nodos.", "Porque no tiene errores."], correctIndex: 2 },
        { question: "En la aproximación no lineal $y = a/(1+bx)$, ¿qué transformación se necesita para linealizarla y usar Mínimos Cuadrados?", options: ["Tomar la raíz cuadrada.", "Tomar el inverso de $y$ ($1/y = (1+bx)/a$).", "Tomar el logaritmo.", "No se puede linealizar."], correctIndex: 1 },
        { question: "¿Qué es el 'Spline de Akima' en comparación con el Spline Cúbico Natural?", options: ["Akima es menos suave.", "Akima utiliza un método local basado en cuatro puntos vecinos para estimar las pendientes, a menudo reduciendo los sobrepasos (overshoots) indeseados.", "Akima requiere que se conozcan las derivadas de segundo orden.", "Akima solo funciona con nodos equidistantes."], correctIndex: 1 },
        { question: "Si se utilizan 6 puntos para interpolar una función con la fórmula de Newton, ¿cuántas diferencias divididas de orden 5 se necesitan calcular?", options: ["Se necesitan 6.", "Se necesitan 5.", "Se necesita solo 1 (el coeficiente principal del polinomio).", "No se necesitan."], correctIndex: 2 }
    ]
};

// Tiempos para cada dificultad en segundos
const difficultyTimes = {
    EASY: 169,      // 2:49
    MEDIUM: 192,    // 3:12
    HARD: 190,      // 3:10
    VERY_HARD: 191  // 3:11
};

// --- ESTADO DEL JUEGO ---
let currentQuestions = [];
let currentQuestionIndex = 0;
let playerHealth = 5;
let currentDifficultyKey = '';
let timerInterval = null; // Para el temporizador
let timeLeft = 0;       // Segundos restantes
let shakeActive = false; // Para el screen shake

// --- ELEMENTOS DOM ADICIONALES (NECESARIOS PARA EL JUEGO) ---
const quizGameScreen = document.getElementById('quiz-game-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const healthBar = document.getElementById('health-bar');
const questionText = document.getElementById('question-text');
const answerOptionsContainer = document.getElementById('answer-options');
const restartButton = document.getElementById('restart-btn');
const currentDifficultyDisplay = document.getElementById('current-difficulty');
const timerElement = document.getElementById('timer');

// --- CÓDIGO JS EXISTENTE DEL USUARIO ---
const body = document.body;
const stormOverlay = document.getElementById('storm-overlay');
// const thunderSound = new Audio('trueno.mp3'); // Comentado para evitar error 404, el archivo no existe
// La funcionalidad de audio ha sido eliminada.

// --- ELEMENTOS DOM CONTINUACIÓN ---
const introOverlay = document.getElementById('intro-overlay');
const introText = document.getElementById('intro-text');
const welcomeContainer = document.getElementById('welcome-container');
const startButton = document.getElementById('start-quiz-btn');
const titleElement = document.querySelector('#project-title h1');
const subtitleElement = document.querySelector('#project-title h2');
const difficultyScreen = document.getElementById('difficulty-screen');
const instructionsScreen = document.getElementById('instructions-screen'); // Pantalla de instrucciones
const transitionOverlay = document.getElementById('transition-overlay'); // Overlay de transición
const startTransmissionBtn = document.getElementById('start-transmission-btn'); // Botón en la pantalla de instrucciones

const btnEasy = document.getElementById('btn-easy');
const btnMedium = document.getElementById('btn-medium');
const btnHard = document.getElementById('btn-hard');
const btnVeryHard = document.getElementById('btn-very-hard');
const gameMessage = document.getElementById('confirmation-message');

// --- ELEMENTOS Y LÓGICA DE AUDIO ---
const audioIntro = document.getElementById('audio-intro');
const audioCorrect = document.getElementById('audio-correct');
const audioIncorrect = document.getElementById('audio-incorrect');
const audioMusicEasy = document.getElementById('audio-music-easy');
const audioMusicMedium = document.getElementById('audio-music-medium');
const audioMusicHard = document.getElementById('audio-music-hard');
const audioMusicExtreme = document.getElementById('audio-music-extreme');
const audioButtonClick = document.getElementById('audio-button-click');
const audioInstructions = document.getElementById('audio-instructions');
const allButtons = document.querySelectorAll('button');
let currentMusic = null; // Variable to track the current background music

// Función para detener toda la música
function stopAllMusic() {
    if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
        currentMusic = null;
    }
    // Detener todas las pistas de música para estar seguros
    [audioIntro, audioMusicEasy, audioMusicMedium, audioMusicHard, audioMusicExtreme, audioInstructions].forEach(audio => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}


function playButtonClickSound() {
    if (audioButtonClick) {
        audioButtonClick.currentTime = 0;
        audioButtonClick.play();
    }
}

allButtons.forEach(button => {
    button.addEventListener('click', playButtonClickSound);
});

// --- LÓGICA DE LA TORMENTA (CÓDIGO EXISTENTE DEL USUARIO) ---
function activateLightning() {
    stormOverlay.style.transition = 'none';
    stormOverlay.style.opacity = '0.98';
    body.classList.add('shaking');
    titleElement.classList.add('diamond-glow');
    startButton.classList.add('diamond-glow');

    setTimeout(() => {
        stormOverlay.style.transition = 'opacity 0.8s ease-out';
        stormOverlay.style.opacity = '0';
        body.classList.remove('shaking');
        titleElement.classList.remove('diamond-glow');
        startButton.classList.remove('diamond-glow');
        scheduleNextLightning();
    }, 200);
}

function scheduleNextLightning() {
    const delay = Math.random() * (10000 - 5000) + 5000;
    setTimeout(activateLightning, delay);
}

// --- LÓGICA DEL TEMPORIZADOR Y SCREEN SHAKE ---

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    secs = secs < 10 ? '0' + secs : secs;
    return `${minutes}:${secs}`;
}

function updateTimer() {
    timeLeft--;
    if (timerElement) {
        timerElement.textContent = formatTime(timeLeft);
    }

    // Añade la clase de advertencia cuando queden 10 segundos o menos
    if (timeLeft <= 10 && timeLeft > 0) {
        if (timerElement) timerElement.classList.add('timer-warning');
    }

    // Fin del juego si el tiempo llega a cero
    if (timeLeft <= 0) {
        stopTimer();
        if (gameMessage) gameMessage.querySelector('p').textContent = "¡SE ACABÓ EL TIEMPO! La tormenta te ha alcanzado.";
        gameOver();
    }
}

function gainHealth() {
    if (playerHealth < 5) {
        playerHealth++;
        updateHealthBar();
    }
}


// --- LÓGICA DE SALUD Y GAME OVER (CORREGIDA/AÑADIDA) ---

function updateHealthBar() {
    if (!healthBar) return;

    healthBar.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const block = document.createElement('div');
        block.classList.add('health-block');
        if (i >= playerHealth) {
            block.classList.add('lost');
        }
        healthBar.appendChild(block);
    }
}

function loseHealth() {
    if (playerHealth > 0) {
        playerHealth--;
        updateHealthBar();
    }
    if (playerHealth === 0) {
        gameOver();
    }
}

function gameOver() {
    stopAllMusic();
    stopTimer();
    if (quizGameScreen) quizGameScreen.classList.add('hidden');
    if (gameOverScreen) gameOverScreen.classList.remove('hidden');
    diamondState = 'red';
    isSnowing = true;
}

function resetGame() {
    stopAllMusic();
    stopTimer();
    playerHealth = 5;
    currentQuestionIndex = 0;
    currentQuestions = [];
    currentDifficultyKey = '';

    // Limpiar fondo
    body.classList.remove('bg-easy', 'bg-medium', 'bg-hard', 'bg-extreme');

    // Transición de vuelta
    if (gameOverScreen) gameOverScreen.classList.add('hidden');
    difficultyScreen.classList.remove('hidden');
    difficultyScreen.classList.add('fade-in');

    diamondState = 'default';
    isSnowing = false;
    updateHealthBar();
}

if (restartButton) restartButton.addEventListener('click', resetGame);


// --- LÓGICA DEL CUESTIONARIO Y ARRANQUE DEL JUEGO (CORREGIDA/AÑADIDA) ---

function startGame(difficultyKey) {
    stopAllMusic();
    currentDifficultyKey = difficultyKey;
    currentQuestions = quizData[difficultyKey];
    currentQuestionIndex = 0;
    playerHealth = 5;
    updateHealthBar();

    // --- LÓGICA DE MÚSICA DE FONDO ---
    const musicMap = {
        EASY: audioMusicEasy,
        MEDIUM: audioMusicMedium,
        HARD: audioMusicHard,
        VERY_HARD: audioMusicExtreme
    };
    currentMusic = musicMap[difficultyKey];
    if (currentMusic) {
        currentMusic.volume = 0.4;
        currentMusic.play().catch(e => console.error("Error playing music:", e));
    }


    // --- LÓGICA DEL TEMPORIZADOR ---
    stopTimer();
    timeLeft = difficultyTimes[difficultyKey] || 180; // Default a 3 min si hay error

    if (timerElement) {
        timerElement.textContent = formatTime(timeLeft);
        timerElement.classList.remove('timer-warning');
    }

    timerInterval = setInterval(updateTimer, 1000);
    // --- FIN DE LÓGICA DEL TEMPORIZADOR ---

    // --- LÓGICA DE FONDO DINÁMICO ---
    const bgMap = {
        EASY: 'bg-easy',
        MEDIUM: 'bg-medium',
        HARD: 'bg-hard',
        VERY_HARD: 'bg-extreme'
    };
    body.classList.remove('bg-easy', 'bg-medium', 'bg-hard', 'bg-extreme', 'medium-hover-bg', 'hard-hover-bg', 'very-hard-hover-bg');
    if (bgMap[difficultyKey]) {
        body.classList.add(bgMap[difficultyKey]);
    }
    // --- FIN DE LÓGICA DE FONDO ---

    // --- LÓGICA DE TEMA DINÁMICO ---
    const themeMap = {
        EASY: 'theme-easy',
        MEDIUM: 'theme-medium',
        HARD: 'theme-hard',
        VERY_HARD: 'theme-extreme'
    };

    if (quizGameScreen) {
        // Limpiar clases de tema anteriores
        quizGameScreen.classList.remove('theme-easy', 'theme-medium', 'theme-hard', 'theme-extreme');
        // Añadir la clase de tema actual
        if (themeMap[difficultyKey]) {
            quizGameScreen.classList.add(themeMap[difficultyKey]);
        }
    }
    // --- FIN DE LÓGICA DE TEMA ---

    // La visibilidad ahora es manejada por la lógica de transición,
    // así que solo nos aseguramos de que no esté oculta.
    if (quizGameScreen) {
        quizGameScreen.classList.remove('hidden');
    }

    // Actualizar texto de dificultad
    const displayNames = {
        EASY: 'FÁCIL - SABER',
        MEDIUM: 'MEDIO - APRENDER',
        HARD: 'DIFÍGIL - LUCHAR',
        VERY_HARD: 'EXTREMO - VIVIR'
    };
    if (currentDifficultyDisplay) currentDifficultyDisplay.textContent = `DIFICULTAD: ${displayNames[difficultyKey]}`;

    showQuestion();
}

function showQuestion() {
    if (!questionText || !answerOptionsContainer) return;

    if (currentQuestionIndex >= currentQuestions.length) {
        // Todas las preguntas completadas: Victoria
        stopAllMusic();
        stopTimer();
        if (quizGameScreen) quizGameScreen.classList.add('hidden');
        if (gameMessage) {
            gameMessage.querySelector('p').textContent = "¡VICTORIA! Has dominado la Aproximación Polinomial. Vuelve al menú de dificultad.";
            gameMessage.classList.remove('hidden');
            gameMessage.classList.add('visible');
        }

        // Espera y vuelve a la pantalla de dificultad
        setTimeout(() => {
            currentQuestionIndex = 0;
            if (gameMessage) {
                 gameMessage.classList.add('hidden');
                 gameMessage.classList.remove('visible');
            }
            // Limpiar fondo
            body.classList.remove('bg-easy', 'bg-medium', 'bg-hard', 'bg-extreme');
            difficultyScreen.classList.remove('hidden');
            difficultyScreen.classList.add('fade-in');
        }, 4000);
        return;
    }

    const q = currentQuestions[currentQuestionIndex];
    questionText.innerHTML = q.question;

    const buttons = answerOptionsContainer.querySelectorAll('.answer-btn');

    // Clonar y reemplazar para eliminar oyentes antiguos
    buttons.forEach((btn, index) => {
        const newBtn = btn.cloneNode(true);
        if (q.options[index]) newBtn.innerHTML = q.options[index];
        newBtn.classList.remove('correct', 'incorrect');
        newBtn.disabled = false;
        btn.replaceWith(newBtn);
    });

    const newButtons = answerOptionsContainer.querySelectorAll('.answer-btn');
    newButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => selectAnswer(index));
    });
}

function selectAnswer(selectedIndex) {
    const q = currentQuestions[currentQuestionIndex];
    const buttons = answerOptionsContainer.querySelectorAll('.answer-btn');
    let isCorrect = (selectedIndex === q.correctIndex);

    buttons.forEach(btn => btn.disabled = true);

    buttons.forEach((btn, index) => {
        if (index === q.correctIndex) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        if (audioCorrect) audioCorrect.play();
        gainHealth();
        if (gameMessage) gameMessage.querySelector('p').textContent = "¡Correcto! El flujo de datos es estable.";
    } else {
        if (audioIncorrect) audioIncorrect.play();
        loseHealth();
        if (currentDifficultyKey === 'VERY_HARD') {
            body.classList.add('screen-float');
            body.addEventListener('animationend', () => {
                body.classList.remove('screen-float');
            }, { once: true });
        }
        if (playerHealth === 0) {
             if (gameMessage) gameMessage.querySelector('p').textContent = "ERROR CRÍTICO: ¡Sistema fallido! GAME OVER.";
             gameOver();
             return;
        } else {
             if (gameMessage) gameMessage.querySelector('p').textContent = "¡Error! La señal se ha corrompido. Vida perdida.";
        }
    }

    if (gameMessage) {
        gameMessage.classList.remove('hidden');
        gameMessage.classList.add('visible');
    }

    setTimeout(() => {
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'incorrect');
        });

        if (gameMessage) {
            gameMessage.classList.add('hidden');
            gameMessage.classList.remove('visible');
        }

        currentQuestionIndex++;
        showQuestion();

    }, 1800);
}


// --- CONFIGURACIÓN DE ANIMACIÓN (BLOQUES BRILLANTES Y NIEVE) ---
const bgCanvas = document.getElementById('rain-canvas');
const bgCtx = bgCanvas.getContext('2d');
const fgCanvas = document.getElementById('foreground-canvas');
const fgCtx = fgCanvas.getContext('2d');

let backgroundBlocks = [];
let foregroundBlocks = [];
let snowflakes = [];
let animationRunning = true;
let isSnowing = false; // Controla la animación de nieve
let diamondState = 'default'; // 'default', 'light', 'gold', 'red'

class Snowflake {
    constructor() {
        this.x = Math.random() * fgCanvas.width;
        this.y = Math.random() * fgCanvas.height;
        this.radius = Math.random() * 2 + 1;
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.5;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'white';
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;
    }

    update(canvasHeight) {
        this.y += this.speed;
        if (this.y > canvasHeight) {
            this.y = 0;
            this.x = Math.random() * fgCanvas.width;
        }
    }
}

function initSnow(count = 150) {
    snowflakes = [];
    for (let i = 0; i < count; i++) {
        snowflakes.push(new Snowflake());
    }
}

class GlowingBlock {
    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.brightness = Math.random() * 0.5 + 0.5;
    }

    draw(ctx, isBackground, color, bassLevel = 0) {
        const finalOpacity = this.opacity * this.brightness;
        const sizeMultiplier = 1 + (bassLevel * 1.5);
        const effectiveSize = this.size * sizeMultiplier;

        let blockColor;
        switch (color) {
            case 'light': blockColor = `rgba(200, 255, 255, ${finalOpacity * 1.5})`; break;
            case 'gold': blockColor = `rgba(255, 215, 0, ${finalOpacity})`; break;
            case 'red': blockColor = `rgba(255, 0, 0, ${finalOpacity})`; break;
            case 'purple': blockColor = `rgba(170, 0, 255, ${finalOpacity})`; break;
            default: blockColor = `rgba(0, 255, 255, ${finalOpacity})`;
        }

        if (isBackground) {
            const gradientRadius = effectiveSize * 10 * this.brightness * (1 + bassLevel);
            const gradient = ctx.createRadialGradient(this.x + effectiveSize / 2, this.y + effectiveSize / 2, 0, this.x + effectiveSize / 2, this.y + effectiveSize / 2, gradientRadius);
            gradient.addColorStop(0, blockColor.replace(/[^,]+(?=\))/, '0.1'));
            gradient.addColorStop(1, blockColor.replace(/[^,]+(?=\))/, '0'));
            ctx.fillStyle = gradient;
            ctx.fillRect(this.x - gradientRadius, this.y - gradientRadius, gradientRadius * 2, gradientRadius * 2);
        }

        ctx.fillStyle = blockColor;
        ctx.shadowBlur = effectiveSize * this.brightness * 1.5 * (1 + bassLevel * 2);
        ctx.shadowColor = blockColor.replace(/[^,]+(?=\))/, '0.5');
        ctx.fillRect(this.x, this.y, effectiveSize, effectiveSize);
        ctx.shadowBlur = 0;
    }

    update(canvasHeight, canvasWidth) {
        this.y += this.speed;
        if (this.y > canvasHeight) {
            this.y = -this.size;
            this.x = Math.random() * canvasWidth;
        }
    }
}

function initBlocks() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    fgCanvas.width = window.innerWidth;
    fgCanvas.height = window.innerHeight;
    backgroundBlocks = [];
    foregroundBlocks = [];
    const numBlocks = 100;

    for (let i = 0; i < numBlocks; i++) {
        const size = Math.random() * 10 + 5;
        const x = Math.random() * bgCanvas.width;
        const y = Math.random() * bgCanvas.height;
        const speed = Math.random() * 2 + 1;
        const block = new GlowingBlock(x, y, size, speed);
        (Math.random() > 0.3) ? backgroundBlocks.push(block) : foregroundBlocks.push(block);
    }
}

function animateBlocks() {
    if (!animationRunning) {
        requestAnimationFrame(animateBlocks);
        return;
    }

    requestAnimationFrame(animateBlocks);

    // La lógica de bassLevel fue eliminada ya que el audio no está.
    const bassLevel = 0;

    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    fgCtx.clearRect(0, 0, fgCanvas.width, fgCanvas.height);

    for (let block of backgroundBlocks) {
        block.update(bgCanvas.height, bgCanvas.width);
        block.draw(bgCtx, true, diamondState, bassLevel);
    }
    for (let block of foregroundBlocks) {
        block.update(fgCanvas.height, fgCanvas.width);
        block.draw(fgCtx, false, diamondState, bassLevel);
    }

    if (isSnowing) {
        for (let flake of snowflakes) {
            flake.update(fgCanvas.height);
            flake.draw(fgCtx);
        }
    }
}

window.addEventListener('resize', initBlocks);


// --- LÓGICA DE TRANSICIÓN DE PANTALLAS Y EVENTOS ---

startButton.addEventListener('click', () => {
    if (audioIntro) {
        audioIntro.volume = 0.7;
        audioIntro.play();
    }
    // Inicia la transición de la interfaz de usuario
    welcomeContainer.classList.add('fade-out');

    // Usa un temporizador que coincida con la duración de la animación
    setTimeout(() => {
        welcomeContainer.classList.add('hidden');
        welcomeContainer.classList.remove('fade-out');

        difficultyScreen.classList.remove('hidden');
        difficultyScreen.classList.add('fade-in');
    }, 500); // 500ms, igual que la animación fade-out
});

// --- LÓGICA DE HOVER PARA BOTONES DE DIFICULTAD (CÓDIGO EXISTENTE DEL USUARIO) ---
const setupDifficultyHover = (button, state, bgClass) => {
    button.addEventListener('mouseenter', () => {
        diamondState = state;
        if (bgClass) body.classList.add(bgClass);
        if (gameMessage) {
            gameMessage.querySelector('p').textContent = "¿Estás seguro que quieres jugar con esta dificultad?";
            gameMessage.classList.remove('hidden');
            gameMessage.classList.add('visible');
        }
    });

    button.addEventListener('mouseleave', () => {
        diamondState = 'default';
        if (bgClass) body.classList.remove(bgClass);
        if (gameMessage) {
            gameMessage.classList.remove('visible');
            gameMessage.classList.add('hidden');
        }
    });
};

setupDifficultyHover(btnEasy, 'light');
setupDifficultyHover(btnMedium, 'gold', 'medium-hover-bg');
setupDifficultyHover(btnHard, 'red', 'hard-hover-bg');
setupDifficultyHover(btnVeryHard, 'purple', 'very-hard-hover-bg');

// --- NUEVA LÓGICA DE TRANSICIÓN DE PANTALLAS ---
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Función para manejar el oscurecimiento y aclarado
async function handleTransition(callback) {
    transitionOverlay.classList.add('visible'); // Oscurecer
    await wait(500); // Esperar a que la pantalla esté negra

    if (callback) callback(); // Ejecutar cambio de pantalla mientras está oscuro

    transitionOverlay.classList.remove('visible'); // Aclarar
    await wait(500); // Esperar a que la transición termine
}

// Lógica de clic para los botones de dificultad
const setupDifficultyClick = (button, difficultyKey) => {
    button.addEventListener('click', async () => {
        // 1. Oscurecer y mostrar instrucciones
        await handleTransition(() => {
            stopAllMusic();
            difficultyScreen.classList.add('hidden');
            instructionsScreen.classList.remove('hidden');
            if (audioInstructions) {
                audioInstructions.volume = 0.5;
                audioInstructions.play();
            }
        });

        // 2. Esperar a que el usuario haga clic en "Iniciar Transmisión"
        startTransmissionBtn.onclick = async () => {
            // 3. Oscurecer y empezar el juego
            await handleTransition(() => {
                instructionsScreen.classList.add('hidden');
                quizGameScreen.classList.remove('hidden');
                startGame(difficultyKey); // Iniciar la lógica del juego ahora
            });
        };
    });
};

// Configuración de clic para iniciar juego
setupDifficultyClick(btnEasy, 'EASY');
setupDifficultyClick(btnMedium, 'MEDIUM');
setupDifficultyClick(btnHard, 'HARD');
setupDifficultyClick(btnVeryHard, 'VERY_HARD');

// --- LÓGICA DEL MINIJUEGO DE ESQUIVAR (NUEVA MECÁNICA DE CARRILES) ---

const playerCharacter = document.getElementById('player-character');
const attackerCharacter = document.getElementById('attacker-character');
const warningSign = document.getElementById('warning-sign');
const dodgeMinigameContainer = document.getElementById('dodge-minigame-container');

const test3ShotsBtn = document.getElementById('test-3-shots');
const test4ShotsBtn = document.getElementById('test-4-shots');
const test8ShotsBtn = document.getElementById('test-8-shots');

// --- NUEVO ESTADO DE CARRILES ---
let playerLane = 'bottom'; // El jugador empieza en el carril de abajo
let isAttackSequenceRunning = false;

// Función para cambiar el carril del jugador
function switchPlayerLane() {
    if (playerLane === 'bottom') {
        playerLane = 'top';
        playerCharacter.classList.remove('lane-bottom');
        playerCharacter.classList.add('lane-top');
    } else {
        playerLane = 'bottom';
        playerCharacter.classList.remove('lane-top');
        playerCharacter.classList.add('lane-bottom');
    }
}

// Control con la barra espaciadora
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !quizGameScreen.classList.contains('hidden')) {
        e.preventDefault(); // Evita que la página haga scroll
        switchPlayerLane();
    }
});

// --- NUEVO ESTADO DE CARRILES DEL OPONENTE ---
let attackerLane = 'bottom'; // El oponente también empieza abajo

// Función para establecer el carril del oponente
function setAttackerLane(lane) {
    attackerLane = lane;
    if (lane === 'top') {
        attackerCharacter.classList.remove('lane-bottom');
        attackerCharacter.classList.add('lane-top');
    } else {
        attackerCharacter.classList.remove('lane-top');
        attackerCharacter.classList.add('lane-bottom');
    }
}

// Helper para gestionar los efectos de ser golpeado
function handleHitEffects() {
    // Evita acumular efectos si ya se está ejecutando uno
    if (body.classList.contains('screen-shake-effect')) return;

    body.classList.add('screen-shake-effect');
    playerCharacter.classList.add('player-flicker-effect');

    // Limpieza automática de clases al terminar la animación
    body.addEventListener('animationend', () => {
        body.classList.remove('screen-shake-effect');
    }, { once: true });

    playerCharacter.addEventListener('animationend', () => {
        playerCharacter.classList.remove('player-flicker-effect');
    }, { once: true });
}

// --- SECUENCIA DE ATAQUE CON IA DEL OPONENTE (REESCRITA) ---
async function startAttackSequence(shotCount) {
    if (isAttackSequenceRunning) return;
    isAttackSequenceRunning = true;

    const bulletCountSpan = document.getElementById('bullet-count');
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // 1. Aviso visual
    bulletCountSpan.textContent = shotCount;
    warningSign.classList.remove('hidden');
    warningSign.classList.add('fast-blinking');
    await wait(1000);
    warningSign.classList.add('hidden');
    warningSign.classList.remove('fast-blinking');

    // 2. Fase de Distracción: El oponente se mueve para confundir
    const distractionMoves = Math.floor(Math.random() * 3) + 2; // Entre 2 y 4 movimientos
    for (let i = 0; i < distractionMoves; i++) {
        const nextLane = Math.random() < 0.5 ? 'top' : 'bottom';
        setAttackerLane(nextLane);
        await wait(200 + Math.random() * 200); // Tiempos variables para que sea menos predecible
    }

    await wait(500); // Pausa antes del primer disparo

    // 3. Secuencia de Disparos con patrones de IA
    for (let i = 0; i < shotCount; i++) {
        const attackPattern = Math.random();
        let projectileLane = attackerLane;

        if (attackPattern < 0.3) {
            // 30% FINTA: Amaga, cambia de carril y dispara
            attackerCharacter.classList.add('shooting');
            await wait(250);
            attackerCharacter.classList.remove('shooting');
            const newLane = attackerLane === 'top' ? 'bottom' : 'top';
            setAttackerLane(newLane);
            projectileLane = newLane;

        } else if (attackPattern < 0.6) {
            // 30% DISPARO SORPRESA: Cambia de carril y dispara al instante
            const newLane = attackerLane === 'top' ? 'bottom' : 'top';
            setAttackerLane(newLane);
            projectileLane = newLane;
        }
        // 40% DISPARO NORMAL: Dispara desde el carril actual

        attackerCharacter.classList.add('shooting');

        const projectile = document.createElement('div');
        projectile.id = 'projectile';
        projectile.classList.add(projectileLane === 'top' ? 'lane-top' : 'lane-bottom');
        dodgeMinigameContainer.appendChild(projectile);
        projectile.classList.add('firing');

        // Detección de colisión basada en carriles
        setTimeout(() => {
            if (playerLane === projectileLane) {
                handleHitEffects(); // Golpe si están en el mismo carril
            }
        }, 450); // Momento aproximado del impacto

        projectile.addEventListener('animationend', () => projectile.remove());
        attackerCharacter.addEventListener('animationend', () => {
             attackerCharacter.classList.remove('shooting');
        }, { once: true });

        await wait(600); // Tiempo entre disparos
    }

    isAttackSequenceRunning = false;
}

// Listeners para los botones de prueba
test3ShotsBtn.addEventListener('click', () => startAttackSequence(3));
test4ShotsBtn.addEventListener('click', () => startAttackSequence(4));
test8ShotsBtn.addEventListener('click', () => startAttackSequence(8));


// --- INICIALIZACIÓN ---
function initializeMinigamePositions() {
    // Asegura que los personajes empiecen en el carril de abajo
    playerCharacter.classList.add('lane-bottom');
    attackerCharacter.classList.add('lane-bottom');
    playerLane = 'bottom';
    attackerLane = 'bottom'; // Asegura que el estado del oponente también se inicialice
}

function runIntroSequence() {
    initSnow();
    isSnowing = true; // La nieve/lluvia continua

    // 1 segundo: Aparece el texto con su estilo invernal
    setTimeout(() => {
        if (introText) introText.classList.add('visible');
    }, 1000);

    // 5 segundos: Se desvanece la pantalla de introducción
    setTimeout(() => {
        if (introOverlay) {
            introOverlay.style.opacity = 0;

            // Usar transitionend para garantizar que se oculte el overlay
            introOverlay.addEventListener('transitionend', () => {
                introOverlay.classList.add('hidden');
            }, { once: true });
        }
    }, 5000);
}

window.addEventListener('load', () => {
    initBlocks();
    animateBlocks();
    runIntroSequence();
    updateHealthBar(); // Inicializa la barra (aunque no sea visible)
    initializeMinigamePositions(); // Inicializa las posiciones del minijuego
    scheduleNextLightning();
});
