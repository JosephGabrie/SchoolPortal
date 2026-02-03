<script lang="ts" module>
  import type { TimeValue } from "bits-ui";
  import type { Time } from "@internationalized/date";

  type T = unknown;
</script>

<script lang="ts" generics="T extends TimeValue = Time">
  import { TimeField, type WithoutChildrenOrChild } from "bits-ui";

  let {
    value = $bindable(),
    placeholder = $bindable(),
    labelText = "Select a time",
    ...restProps
  }: WithoutChildrenOrChild<TimeField.RootProps<T>> & {
    name?: string;
    labelText?: string;
  } = $props();
</script>

<TimeField.Root bind:value bind:placeholder {...restProps}>
  <div
    class="flex w-full max-w-[280px] flex-col gap-1.5 flex justify-center items-center"
  >
    <TimeField.Label>{labelText}</TimeField.Label>
    <TimeField.Input
      class="h-input rounded-input border-border-input bg-background text-foreground focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover data-invalid:border-destructive flex w-40 select-none items-center border px-2 py-3 text-sm tracking-[0.01em] "
    >
      {#snippet children({ segments })}
        {#each segments as { part, value }}
          <TimeField.Segment {part}>
            {value}
          </TimeField.Segment>
        {/each}
      {/snippet}
    </TimeField.Input>
  </div>
</TimeField.Root>
