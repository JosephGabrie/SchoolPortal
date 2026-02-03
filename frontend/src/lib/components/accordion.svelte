<script lang="ts">
  import { ChevronDownIcon } from "lucide-svelte";
  import { Accordion } from "@skeletonlabs/skeleton-svelte";
  import { slide } from "svelte/transition";

  let { items } = $props();
</script>

<Accordion>
  {#each items as item, i (item)}
    {#if i !== 0}
      <hr class="hr" />
    {/if}
    <Accordion.Item value={item.id}>
      <h3>
        <Accordion.ItemTrigger
          class="font-bold flex items-center justify-between gap-2"
        >
          {item.title}
          <Accordion.ItemIndicator class="group">
            <ChevronDownIcon
              class="h-5 w-5 transition group-data-[state=open]:rotate-180"
            />
          </Accordion.ItemIndicator>
        </Accordion.ItemTrigger>
      </h3>
      <Accordion.ItemContent>
        {#snippet element(attributes)}
          {#if !attributes.hidden}
            <div {...attributes} transition:slide={{ duration: 150 }}>
              {item.description}
            </div>
          {/if}
        {/snippet}
      </Accordion.ItemContent>
    </Accordion.Item>
  {/each}
</Accordion>
