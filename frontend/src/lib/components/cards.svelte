<script lang="ts">
  import { Time } from "@internationalized/date";
  import { goto } from "$app/navigation";
  let { name, roomNumber, subject, teacher }: App.classRoom = $props();
</script>

<a
  href="/Teacher/aabb"
  class=" card preset-filled-surface-100-900 border border-surface-200-800 card-hover divide-surface-200-800 block w-3xs"
>
  <header class=" bg-primary-500 p-10"></header>
  <article class=" pt-4 pb-5 pr-4 pl-4 space-y-4">
    <div>
      <h2 class="h6">{name}</h2>
      <h3 class="h3">{subject}</h3>
    </div>
    <p class="opacity-60">{roomNumber}</p>
  </article>

  <footer class="flex items-center justify-between gap-4 p-4">
    <small class="opacity-60">{teacher}</small>
    <small class="opacity-60">On {new Date().toLocaleDateString()}</small>
  </footer>
</a>
