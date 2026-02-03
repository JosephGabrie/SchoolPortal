<script lang="ts">
  import { SettingsIcon, SkullIcon } from "lucide-svelte";
  import { Navigation } from "@skeletonlabs/skeleton-svelte";
  import type { Component } from "svelte";
  interface Props {
    links: Array<{
      label: string;
      href: string;
      icon: any;
    }>;
    value?: string;
  }

  let { links, value = "" }: Props = $props();

  let anchorRail =
    " btn hover:preset-tonal aspect-square w-full max-w-[84px] flex flex-col items-center gap-0.5";
</script>

<div
  class=" w-full h-[dvh] grid grid-cols-[auto_1fr] border border-surface-200-800"
>
  <!-- --- -->
  <Navigation layout="rail" class={value}>
    <Navigation.Header>
      <a
        href="/"
        class={anchorRail}
        title="View Homepage"
        aria-label="View Homepage"
      >
        <SkullIcon class="size-8" />
      </a>
    </Navigation.Header>
    <Navigation.Content>
      <Navigation.Menu>
        {#each links as link (link)}
          {@const Icon = link.icon}
          <a href={link.href} class={anchorRail}>
            <Icon class="size-5" />
            <span class="text-xs">{link.label}</span>
          </a>
        {/each}
      </Navigation.Menu>
    </Navigation.Content>
    <Navigation.Footer>
      <a
        href="/settings"
        class={anchorRail}
        title="Settings"
        aria-label="Settings"
      >
        <SettingsIcon class="size-5" />
      </a>
    </Navigation.Footer>
  </Navigation>
  <!-- --- -->
</div>
