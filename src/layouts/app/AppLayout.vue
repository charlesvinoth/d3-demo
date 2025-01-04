<template>
  <div>
    <nav>
      <ul>
        <li v-for="route in routes" :key="route.path">
          <RouterLink :to="route.path" class="route">{{ route.name }}</RouterLink>
        </li>
      </ul>
    </nav>

    <main class="graph-container">
      <RouterView />
    </main>
  </div>
</template>

<script>
export default {
  name: "AppLayout",

  data() {
    return {
      routes: [
        {
          path: "/",
          name: "1. Two Points & One Line",
        },
        {
          path: "/first-quadrant",
          name: "2. First Quadrant",
        },
        {
          path: "/coordinate-grid",
          name: "3. Coordinate Grid",
        },
      ],
    }
  },
}
</script>

<style scoped>
nav {
  height: 96px;
  padding: 0px 24px;
  display: flex;
  align-items: center;
  background-color: var(--gray-50);
}

ul {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.route {
  text-decoration: none;
  color: var(--gray-500);
}

.route:hover {
  color: var(--gray-700);
  transition: color 0.2s ease-in-out;
}

.router-link-exact-active {
  color: var(--blue-700);
  text-decoration: underline;
  font-weight: 500;
  text-underline-offset: 4px;
}

.router-link-exact-active:hover {
  color: var(--blue-700);
}

.graph-container {
  height: calc(100dvh - 96px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
