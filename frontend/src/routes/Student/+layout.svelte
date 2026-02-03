<script lang="ts">
  import Sidebar from "$lib/components/sidebar.svelte";
  import "../../app.css";
  import { BookIcon, Calendar, HouseIcon } from "lucide-svelte";

  import { goto } from "$app/navigation";
  function studentToTeacher() {
    goto("/Teacher");
  }
  const links = [
    { label: "Home", href: "/Student", icon: HouseIcon },
    {
      label: "Dashboard",
      href: "/Student/dashboard",
      icon: BookIcon,
    },
    { label: "Assignments", href: "#", icon: BookIcon },
    {
      label: "Calendar",
      href: "/Student/calendar",
      icon: Calendar,
    },
  ];
  let { children } = $props();
</script>

<div
  class=" w-full h-dvh grid grid-cols-[auto_1fr] border border-surface-200-800"
>
  <Sidebar {links} />
  <main class="overflow-auto">
    <div class="badge">
      <button
        type="button"
        class="btn preset-filled-primary-50-950"
        onclick={studentToTeacher}
        >Enter Teacher Mode
      </button>
    </div>
    {@render children?.()}
  </main>
</div>
