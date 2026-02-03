<script lang="ts">
  let { children } = $props();
  import Cards from "$lib/components/cards.svelte";
  import SubSideBar from "$lib/components/subSideBar.svelte";
  import { BookIcon, Calculator, Calendar, HouseIcon } from "lucide-svelte";
  const links = [
    { label: "Home", href: "/Teacher", icon: HouseIcon },
    {
      label: "Students",
      href: "/Teacher/aabb/myStudents",
      icon: Calculator,
    },
    { label: "Assignments", href: "/Teacher/aabb/assignments", icon: BookIcon },
    {
      label: "Curriculum",
      href: "/aabb/curriculum",
      icon: Calendar,
    },
  ];
</script>

<div
  class=" w-full h-dvh grid grid-cols-[auto_1fr] border border-surface-200-800"
>
  <SubSideBar {links} value="bg-tertiary-300" />
  <main class="overflow-auto">
    {@render children?.()}
  </main>
</div>
