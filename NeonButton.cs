using System;
using System.Windows.Forms;
using System.Drawing;
using System.Drawing.Drawing2D;

namespace SIKA.Controls
{
    public class NeonButton : Button
    {
        private Color buttonColor = Color.FromArgb(0, 0, 0);
        private Color glowColor = Color.FromArgb(0, 192, 255);
        private bool isHovering = false;

        public NeonButton()
        {
            this.FlatStyle = FlatStyle.Flat;
            this.FlatAppearance.BorderSize = 0;
            this.ForeColor = Color.White;
            this.Font = new Font("Arial", 12F, FontStyle.Bold, GraphicsUnit.Point, ((byte)(0)));
            this.Size = new Size(150, 50);
            this.BackColor = buttonColor;
        }

        protected override void OnMouseEnter(EventArgs e)
        {
            base.OnMouseEnter(e);
            isHovering = true;
            this.Invalidate();
        }

        protected override void OnMouseLeave(EventArgs e)
        {
            base.OnMouseLeave(e);
            isHovering = false;
            this.Invalidate();
        }

        protected override void OnPaint(PaintEventArgs pevent)
        {
            base.OnPaint(pevent);
            pevent.Graphics.SmoothingMode = SmoothingMode.AntiAlias;

            // Dibuja el fondo del botón
            pevent.Graphics.Clear(this.Parent.BackColor);

            // Define el radio para las esquinas redondeadas
            int borderRadius = 20;
            GraphicsPath path = new GraphicsPath();
            path.AddArc(new Rectangle(0, 0, borderRadius, borderRadius), 180, 90);
            path.AddArc(new Rectangle(this.Width - borderRadius, 0, borderRadius, borderRadius), -90, 90);
            path.AddArc(new Rectangle(this.Width - borderRadius, this.Height - borderRadius, borderRadius, borderRadius), 0, 90);
            path.AddArc(new Rectangle(0, this.Height - borderRadius, borderRadius, borderRadius), 90, 90);
            path.CloseAllFigures();

            pevent.Graphics.FillPath(new SolidBrush(buttonColor), path);

            // Dibuja el efecto de brillo (glow)
            if (isHovering)
            {
                using (Pen glowPen = new Pen(glowColor, 5))
                {
                    glowPen.LineJoin = LineJoin.Round;
                    pevent.Graphics.DrawPath(glowPen, path);
                }
            }

            // Dibuja el texto
            TextRenderer.DrawText(pevent.Graphics, this.Text, this.Font,
                this.ClientRectangle, this.ForeColor, TextFormatFlags.HorizontalCenter | TextFormatFlags.VerticalCenter);
        }
    }
}
