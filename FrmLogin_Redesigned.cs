using System;
using System.Windows.Forms;
using System.Drawing;
using System.Drawing.Drawing2D;
using SIKA;
using SIKA.Controls; // 1. Añadir using para los controles personalizados

namespace SIKA.Diseno
{
    public partial class FrmLogin_Redesigned : Form
    {
        private Timer backgroundAnimationTimer;
        private Color color1 = Color.FromArgb(2, 6, 23); // Noche Estrellada
        private Color color2 = Color.FromArgb(17, 24, 39); // Acero Oscuro
        private float angle = 0f;

        // --- CONTROLES PERSONALIZADOS ---
        private TransparentTextBox txtUser;
        private TransparentTextBox txtPass;
        private NeonButton btnAcceder;
        private Label label1;
        private Label label2;
        private Label lblTitulo; // Título del formulario
        private System.ComponentModel.IContainer components;

        public FrmLogin_Redesigned()
        {
            InitializeComponent();
            InitializeFuturisticDesign();
            CenterControls(); // Método para centrar los controles
        }

        private void InitializeFuturisticDesign()
        {
            this.DoubleBuffered = true;
            this.FormBorderStyle = FormBorderStyle.None; // Para un look más limpio
            this.WindowState = FormWindowState.Maximized; // Ocupa toda la pantalla

            backgroundAnimationTimer = new Timer();
            backgroundAnimationTimer.Interval = 50;
            backgroundAnimationTimer.Tick += new EventHandler(BackgroundAnimationTimer_Tick);
            backgroundAnimationTimer.Start();
        }

        private void BackgroundAnimationTimer_Tick(object sender, EventArgs e)
        {
            angle = (angle + 0.5f) % 360f;
            this.Invalidate();
        }

        protected override void OnPaintBackground(PaintEventArgs e)
        {
            base.OnPaintBackground(e);
            using (LinearGradientBrush brush = new LinearGradientBrush(this.ClientRectangle, color1, color2, angle))
            {
                e.Graphics.FillRectangle(brush, this.ClientRectangle);
            }
        }

        private void CenterControls()
        {
            // Centrar todos los controles en el formulario
            int centerX = this.ClientSize.Width / 2;
            int startY = this.ClientSize.Height / 3;

            lblTitulo.Location = new Point(centerX - lblTitulo.Width / 2, startY - 80);

            label1.Location = new Point(centerX - txtUser.Width / 2, startY);
            txtUser.Location = new Point(centerX - txtUser.Width / 2, startY + 30);

            label2.Location = new Point(centerX - txtPass.Width / 2, startY + 80);
            txtPass.Location = new Point(centerX - txtPass.Width / 2, startY + 110);

            btnAcceder.Location = new Point(centerX - btnAcceder.Width / 2, startY + 180);
        }

        protected override void OnResize(EventArgs e)
        {
            base.OnResize(e);
            CenterControls(); // Vuelve a centrar si cambia el tamaño
            this.Invalidate();
        }

        private void btnAcceder_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(this.txtUser.Text) || string.IsNullOrEmpty(this.txtPass.Text))
            {
                MessageBox.Show("Debe ingresar el usuario y la contraseña.", "Campos Vacíos", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            UsuarioDAO usuarioDAO = new UsuarioDAO();
            string contrasenaHasheada = UsuarioDAO.HashPassword(this.txtPass.Text);
            bool loginExitoso = usuarioDAO.ValidarLogin(this.txtUser.Text, contrasenaHasheada);

            if (loginExitoso)
            {
                MessageBox.Show($"¡Bienvenido, {Global.NombreCompleto}! Rol: {Global.RolUsuario}", "Acceso Exitoso", MessageBoxButtons.OK, MessageBoxIcon.Information);

                // 2. Descomentar el código para abrir el formulario principal
                FrmPrincipal principal = new FrmPrincipal();
                principal.Show();
                this.Hide();
            }
            else
            {
                MessageBox.Show("Credenciales inválidas. Verifique su usuario y contraseña.", "Error de Login", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.txtUser = new TransparentTextBox();
            this.txtPass = new TransparentTextBox();
            this.btnAcceder = new NeonButton();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.lblTitulo = new System.Windows.Forms.Label();
            this.SuspendLayout();

            //
            // lblTitulo
            //
            this.lblTitulo.AutoSize = true;
            this.lblTitulo.Font = new System.Drawing.Font("Arial", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblTitulo.ForeColor = System.Drawing.Color.White;
            this.lblTitulo.BackColor = Color.Transparent;
            this.lblTitulo.Name = "lblTitulo";
            this.lblTitulo.Size = new System.Drawing.Size(250, 46);
            this.lblTitulo.Text = "INICIAR SESIÓN";

            //
            // txtUser
            //
            this.txtUser.Size = new System.Drawing.Size(300, 30);
            this.txtUser.TabIndex = 0;

            //
            // txtPass
            //
            this.txtPass.Size = new System.Drawing.Size(300, 30);
            this.txtPass.TabIndex = 1;
            this.txtPass.PasswordChar = '*';

            //
            // btnAcceder
            //
            this.btnAcceder.Name = "btnAcceder";
            this.btnAcceder.Size = new System.Drawing.Size(180, 50);
            this.btnAcceder.TabIndex = 2;
            this.btnAcceder.Text = "ACCEDER";
            this.btnAcceder.Click += new System.EventHandler(this.btnAcceder_Click);

            //
            // label1
            //
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Arial", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.ForeColor = System.Drawing.Color.FromArgb(0, 192, 255);
            this.label1.BackColor = Color.Transparent;
            this.label1.Name = "label1";
            this.label1.Text = "USUARIO";

            //
            // label2
            //
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Arial", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.ForeColor = System.Drawing.Color.FromArgb(0, 192, 255);
            this.label2.BackColor = Color.Transparent;
            this.label2.Name = "label2";
            this.label2.Text = "CONTRASEÑA";

            //
            // FrmLogin_Redesigned
            //
            this.ClientSize = new System.Drawing.Size(1280, 720);
            this.Controls.Add(this.lblTitulo);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.txtPass);
            this.Controls.Add(this.btnAcceder);
            this.Controls.Add(this.txtUser);
            this.Name = "FrmLogin_Redesigned";
            this.Text = "Login Futurista";
            this.ResumeLayout(false);
            this.PerformLayout();
        }
    }
}
