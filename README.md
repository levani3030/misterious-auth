# RostevanUI - Horror Themed Authentication UI

This project is a horror-themed authentication UI built with Vue 3 and Sass, featuring various CSS animations. It is part of a larger effort to migrate the CyberStateRP project to the Rebar framework.

## Project Context: CyberStateRP to Rebar Migration

This UI is being developed as a component for the new version of the CyberStateRP project, which is being migrated to the Rebar framework. The goal is to recreate all existing functionalities and visuals from the original CyberStateRP project within the Rebar framework, following the Rebar Plugin documentation and best practices.

**Key Technologies:**
- **Frontend:** Vue 3, Typescript, Sass (SCSS)
- **Backend (Rebar Context):** Alt:V + Rebar, Typescript
- **Database (Rebar Context):** MongoDB

## Features

- Horror-themed design
- Multiple CSS animations for visual effects (Screen Shake, Flicker, Lightning, Ghost Text, Blood Rain, Broken Mirror, Ghostly Assault, etc.)
- Authentication forms (Login, Signup, Forgot Password)
- Color preset selection
- Horror scenario selection

## Setup and Running

1.  **Clone the repository:**
    ```bash
    git clone [repository_url]
    cd NK
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should now be available at `http://localhost:5173/`.

## Project Structure

-   `src/`: Contains the main application source code.
    -   `assets/`: Static assets like fonts and icons.
    -   `components/`: Vue components (e.g., authentication forms, effect menu).
    -   `router/`: Vue Router configuration.
    -   `services/`: Utility services (e.g., `effectsService.ts` for managing animations).
    -   `styles/`: Global styles and animation files.
        -   `animations/`: Individual SCSS files for each horror animation.
    -   `views/`: Vue views (e.g., `AuthView.vue`).
-   `public/`: Public assets.
-   `index.html`: Main HTML file.
-   `package.json`: Project dependencies and scripts.
-   `vite.config.ts`: Vite build configuration.

---

# ქართული ვერსია

# RostevanUI - საშინელებათა თემატიკის ავტორიზაციის ინტერფეისი

ეს პროექტი არის საშინელებათა თემატიკის ავტორიზაციის ინტერფეისი, შექმნილი Vue 3-ისა და Sass-ის გამოყენებით, სხვადასხვა CSS ანიმაციებით. ის წარმოადგენს CyberStateRP პროექტის Rebar ფრეიმვორკზე მიგრაციის ფართომასშტაბიანი სამუშაოს ნაწილს.

## პროექტის კონტექსტი: CyberStateRP-დან Rebar-ზე მიგრაცია

ეს ინტერფეისი მუშავდება, როგორც კომპონენტი CyberStateRP პროექტის ახალი ვერსიისთვის, რომელიც მიგრირდება Rebar ფრეიმვორკზე. მიზანია CyberStateRP პროექტში არსებული ყველა ფუნქციონალისა და ვიზუალის ხელახლა შექმნა Rebar ფრეიმვორკის ფარგლებში, Rebar Plugin-ების დოკუმენტაციისა და საუკეთესო პრაქტიკის დაცვით.

**ძირითადი ტექნოლოგიები:**
- **ფრონტენდი:** Vue 3, Typescript, Sass (SCSS)
- **ბეკენდი (Rebar კონტექსტი):** Alt:V + Rebar, Typescript
- **მონაცემთა ბაზა (Rebar კონტექსტი):** MongoDB

## მახასიათებლები

- საშინელებათა თემატიკის დიზაინი
- მრავალი CSS ანიმაცია ვიზუალური ეფექტებისთვის (ეკრანის რყევა, ციმციმი, ელვა, მოჩვენებითი ტექსტი, სისხლიანი წვიმა, გატეხილი სარკე, მოჩვენების თავდასხმა და ა.შ.)
- ავტორიზაციის ფორმები (შესვლა, რეგისტრაცია, პაროლის აღდგენა)
- ფერების წინასწარ განსაზღვრული ნაკრების არჩევა
- საშინელებათა სცენარების არჩევა

## დაყენება და გაშვება

1.  **რეპოზიტორიის კლონირება:**
    ```bash
    git clone [repository_url]
    cd NK
    ```
2.  **დამოკიდებულებების ინსტალაცია:**
    ```bash
    npm install
    ```
3.  **დეველოპმენტ სერვერის გაშვება:**
    ```bash
    npm run dev
    ```
    აპლიკაცია ხელმისაწვდომი იქნება მისამართზე `http://localhost:5173/`.

## პროექტის სტრუქტურა

-   `src/`: შეიცავს აპლიკაციის ძირითად კოდს.
    -   `assets/`: სტატიკური რესურსები, როგორიცაა ფონტები და იკონები.
    -   `components/`: Vue კომპონენტები (მაგ., ავტორიზაციის ფორმები, ეფექტების მენიუ).
    -   `router/`: Vue Router კონფიგურაცია.
    -   `services/`: დამხმარე სერვისები (მაგ., `effectsService.ts` ანიმაციების სამართავად).
    -   `styles/`: გლობალური სტილები და ანიმაციის ფაილები.
        -   `animations/`: ცალკეული SCSS ფაილები თითოეული საშინელებათა ანიმაციისთვის.
-   `public/`: საჯარო რესურსები.
-   `index.html`: მთავარი HTML ფაილი.
-   `package.json`: პროექტის დამოკიდებულებები და სკრიპტები.
-   `vite.config.ts`: Vite build კონფიგურაცია.
