import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...props
}) => {
    const baseStyles = `
    inline-flex items-center justify-center
    font-medium transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

    const variants = {
        primary: `
      bg-white text-[var(--bg-primary)]
      hover:bg-gray-100 active:bg-gray-200
      focus:ring-white
    `,
        secondary: `
      bg-[var(--bg-secondary)] text-white
      border border-[var(--border-subtle)]
      hover:bg-[#1a1a1a] active:bg-[#222]
      focus:ring-white/20
    `,
        outline: `
      bg-transparent text-white
      border border-white/30
      hover:bg-white/10 hover:border-white/50
      focus:ring-white/30
    `,
        ghost: `
      bg-transparent text-white
      hover:bg-white/10
      focus:ring-white/20
    `,
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm rounded-lg',
        md: 'px-6 py-3 text-base rounded-xl',
        lg: 'px-8 py-4 text-lg rounded-xl',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.replace(/\s+/g, ' ').trim()}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
