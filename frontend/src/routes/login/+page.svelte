<script lang="ts">
  import { enhance } from '$app/forms';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="card p-10 flex flex-col items-center gap-6 shadow-xl">
    <h2 class="h2">Welcome to School Portal</h2>
    <form method="POST" use:enhance>
      <button class="btn variant-filled-primary">Sign in with WorkOS</button>
    </form>
  </div>
</div>
