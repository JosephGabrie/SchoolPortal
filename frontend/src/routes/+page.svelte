<script lang="ts">
  import { goto } from "$app/navigation";
  //  export let data: PageData;
  let username = "";
  let password = "";
  let errorMessage = "";

  async function handleLogin() {
    console.log("HELLO");
    errorMessage = "";
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login/student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        errorMessage = data.error || "Login failed";
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.role);

      if (data.role === "student") {
        goto("/Student");
      } else if (data.role === "teacher") {
        goto("/Teacher");
      } else {
        goto("/");
      }
      console.log("Login successful:", data.user);
    } catch (err) {
      console.error(err);
      errorMessage = "server connection failed";
    }
  }
</script>

<div class="h-dvh flex justify-center items-center bg-secondary-900">
  <div class=" w-md px-4 py-4 bg-surface-100 rounded-lg">
    <h2 class="text-xl font-bold mb-4 text-center text-surface-950 bg">
      Login
    </h2>

    <form class="space-y-4" on:submit|preventDefault={handleLogin}>
      <div class="form-group">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="student@school.edu"
          bind:value={username}
          required
          class="w-full border border-surface-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          bind:value={password}
          required
          class="w-full border border-surface-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-secondary-600 text-white py-2 rounded-md hover:bg-secondary-800 transition"
        >Login</button
      >
    </form>
  </div>
</div>
