# Nuxt Scaffold Usage Guide

Follow these steps to create and scaffold a Nuxt project:

1. **Create a Nuxt Project**

   Run the following command to create a new Nuxt project:

   ```sh
   npm create nuxt tmp/nuxt-demo
   ```

   Choose `npm` as package manager, for example.

2. **Generate Scaffold**

   Use the scaffold command to generate the necessary files for your project:

   ```sh
   pnpm run scaffold post title:string description:text --framework nuxt --target tmp/nuxt-demo
   ```

3. **Install Dependencies**

   Navigate to the project folder and install the dependencies:

   ```sh
   cd tmp/nuxt-demo
   npm install
   ```

4. **Run the Development Server**

   Start the development server and test your project by visiting `localhost:3000/posts`:

   ```sh
   npm run dev
   ```

You should now see your scaffolded posts page at `localhost:3000/posts`.
