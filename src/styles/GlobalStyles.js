import { createGlobalStyle } from "styled-components";
import "primereact/resources/themes/lara-light-indigo/theme.css";

const GlobalStyles = createGlobalStyle`
  :root {
    &, &.light-mode{
      --color-grey-0: #fff;
      --color-grey-50: #f9fafb;
      --color-grey-100: #f3f4f6;
      --color-grey-200: #e5e7eb;
      --color-grey-300: #d1d5db;
      --color-grey-400: #9ca3af;
      --color-grey-500: #6b7280;
      --color-grey-600: #4b5563;
      --color-grey-700: #374151;
      --color-grey-800: #1f2937;
      --color-grey-900: #111827;

      --color-blue-50: #eff6ff;
      --color-blue-100: #e0f2fe;
      --color-blue-500: #3b82f6;
      --color-blue-600: #2563eb;
      --color-blue-700: #0369a1;
      --color-green-50: #f0fdf4;
      --color-green-100: #dcfce7;
      --color-green-500: #22c55e;
      --color-green-600: #16a34a;
      --color-green-700: #15803d;
      --color-yellow-50: #fefce8;
      --color-yellow-100: #fef9c3;
      --color-yellow-500: #eab308;
      --color-yellow-600: #ca8a04;
      --color-yellow-700: #a16207;
      --color-silver-100: #e5e7eb;
      --color-silver-700: #374151;
      --color-indigo-50: #eef2ff;
      --color-indigo-100: #e0e7ff;
      --color-indigo-600: #4f46e5;
      --color-indigo-700: #4338ca;

      --color-red-50: #fef2f2;
      --color-red-100: #fee2e2;
      --color-red-500: #ef4444;
      --color-red-600: #dc2626;
      --color-red-700: #b91c1c;
      --color-red-800: #991b1b;

      --color-orange-50: #fffbeb;
      --color-orange-100: #ffedd5;
      --color-orange-200: #fed7aa;
      --color-orange-500: #f97316;
      --color-orange-600: #ea580c;
      --color-orange-700: #c2410c;
      --color-orange-800: #9a3412;
      --color-orange-900: #7c2d12;

      --backdrop-color: rgba(255, 255, 255, 0.1);

      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
      --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
      --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

     
    }
    
    &.dark-mode{
      --color-grey-0: #18212f;
      --color-grey-50: #111827;
      --color-grey-100: #1f2937;
      --color-grey-200: #374151;
      --color-grey-300: #4b5563;
      --color-grey-400: #6b7280;
      --color-grey-500: #9ca3af;
      --color-grey-600: #d1d5db;
      --color-grey-700: #e5e7eb;
      --color-grey-800: #f3f4f6;
      --color-grey-900: #f9fafb;

      --color-blue-50: #1e3a8a;
      --color-blue-100: #1e40af;
      --color-blue-500: #60a5fa;
      --color-blue-600: #93c5fd;
      --color-blue-700: #bfdbfe;
      --color-green-50: #14532d;
      --color-green-100: #166534;
      --color-green-500: #4ade80;
      --color-green-600: #86efac;
      --color-green-700: #bbf7d0;
      --color-yellow-50: #713f12;
      --color-yellow-100: #854d0e;
      --color-yellow-500: #facc15;
      --color-yellow-600: #fde047;
      --color-yellow-700: #fef08a;
      --color-silver-100: #374151;
      --color-silver-700: #f3f4f6;
      --color-indigo-50: #312e81;
      --color-indigo-100: #3730a3;
      --color-indigo-600: #a5b4fc;
      --color-indigo-700: #c7d2fe;


      --color-red-50: #7f1d1d;
      --color-red-100: #991b1b;
      --color-red-500: #f87171;
      --color-red-600: #fca5a5;
      --color-red-700: #fecaca;
      --color-red-800: #fee2e2;

      --color-orange-50: #7c2d12;
      --color-orange-100: #9a3412;
      --color-orange-200: #c2410c;
      --color-orange-300: #ea580c;
      --color-orange-400: #f97316;
      --color-orange-500: #fb923c;
      --color-orange-600: #fdba74;
      --color-orange-700: #fed7aa;
      --color-orange-800: #ffedd5;
      --color-orange-900: #fffbeb;
      

      --backdrop-color: rgba(0, 0, 0, 0.3);

      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
      --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
      --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

      /* Adjusts the opacity of disabled checkbox inputs to enhance visibility in dark mode */
      input[type="checkbox"]:disabled {
        opacity: 0.3;
      }
    }
  
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    transition: background-color 0.3s, border 0.3s;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family:  sans-serif;
    color: var(--color-grey-700);

    transition: color 0.3s, background-color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  button:has(svg) {
    line-height: 0;
  }

  *:disabled {
    cursor: not-allowed;
  }

  select:disabled,
  input:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }

  img {
    max-width: 100%;
  }
   

  /* Datepicker customization*/
  .p-inputtext{
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-400);
    padding: 0.5rem 1.2rem;
    border-radius: 15px;
    box-shadow: var(--shadow-sm);
    width: 100%;
    font-size: 1.4rem;

    &:focus {
      outline: 2px solid var(--color-orange-600);
      outline-offset: -2px;
    }

    &::placeholder {
      color: var(--color-grey-400);
    }
  }


   .p-component:disabled{
    opacity: 1;
  }

  .p-disabled, .p-disabled *{
    pointer-events: all;
  }

  .p-datepicker-header{
    font-size: 1.2rem;
    background-color: var(--color-grey-0);
    color:var(--color-grey-700);
  }

  .p-datepicker{
    font-size: 1.2rem;
    background-color: var(--color-grey-0);
    color:var(--color-grey-700);
  }

  span[data-p-highlight='false']:not(.p-disabled):hover, .p-datepicker-next:hover, .p-datepicker-prev:hover  {
    background-color: var(--color-grey-600);
    color:var(--color-grey-0);
  }

  .p-datepicker table td.p-datepicker-today > span{
    background-color: var(--color-grey-600) ;
    color:var(--color-grey-0) ;
  }
 

  .p-datepicker-calendar{
    font-size: 1.2rem;
  
  }
  
  button[aria-label="Today"]{
    margin-left: 1rem;
  }

  button[aria-label="Clear"]{
    margin-right: 1rem;
  }

  .p-datepicker-title{
    display: flex;
    gap: 0.5rem;
  }

`;

export default GlobalStyles;
