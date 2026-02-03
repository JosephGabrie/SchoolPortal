<script lang="ts">
  import Sidebar from "$lib/components/sidebar.svelte";
  import "../../app.css";
  import { BookIcon, Calendar, HouseIcon } from "lucide-svelte";

  import { goto } from "$app/navigation";
  function teacherToStudent() {
    goto("/Student");
  }
  const links = [
    { label: "Home", href: "/Teacher", icon: HouseIcon },
    {
      label: "Dashboard",
      href: "/Teacher/dashboard",
      icon: BookIcon,
    },
    { label: "Assignments", href: "/Teacher/assignments", icon: BookIcon },
    {
      label: "Calendar",
      href: "/Teacher/calendar",
      icon: Calendar,
    },
  ];
  let { children } = $props();
</script>

<div
  class=" w-full h-dvh grid grid-cols-[auto_1fr] border border-surface-200-800"
>
  <Sidebar {links} value="bg-secondary-300" />
  <main class="overflow-auto">
    <div class="badge">
      <button
        type="button"
        class="btn preset-filled-primary-50-950"
        onclick={teacherToStudent}
        >Enter student Mode
      </button>
    </div>

    {@render children?.()}
  </main>
</div>
