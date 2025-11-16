using System;
using System.Windows.Forms;
using System.Drawing;
using System.Drawing.Drawing2D;

namespace SIKA.Controls
{
    public class TransparentTextBox : TextBox
    {
        public TransparentTextBox()
        {
            this.BorderStyle = BorderStyle.None;
            this.BackColor = Color.FromArgb(30, 30, 30);
            this.ForeColor = Color.White;
            this.Font = new Font("Arial", 12F, FontStyle.Regular, GraphicsUnit.Point, ((byte)(0)));
            this.AutoSize = false;
            this.Height = 30;
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            base.OnPaint(e);

            // Dibuja un borde inferior para un look minimalista
            using (Pen borderPen = new Pen(Color.FromArgb(0, 192, 255), 2))
            {
                e.Graphics.DrawLine(borderPen, 0, this.Height - 1, this.Width, this.Height - 1);
            }
        }

        protected override void OnGotFocus(EventArgs e)
        {
            base.OnGotFocus(e);
            this.BackColor = Color.FromArgb(45, 45, 45);
            this.Invalidate();
        }

        protected override void OnLostFocus(EventArgs e)
        {
            base.OnLostFocus(e);
            this.BackColor = Color.FromArgb(30, 30, 30);
            this.Invalidate();
        }
    }
}
