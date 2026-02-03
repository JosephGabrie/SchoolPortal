<script lang="ts">
  import { Progress, useId } from "bits-ui";
  import type { ComponentProps } from "svelte";
  import { Tween } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";
  import { onMount } from "svelte";

  let {
    value = 0,
    min = 0,
    classSize = 30,
    label,
    valueLabel,
  }: ComponentProps<typeof Progress.Root> & {
    label: string;
    classSize: number;
    valueLabel: string;
  } = $props();

  const tween = new Tween(value, { duration: 500, easing: cubicInOut });
  const labelId = useId();
  const percentage = $derived(((tween.current ?? 0) / classSize) * 100);
</script>

<div class="flex w-[60%] flex-col gap-2 px-4 py-4">
  <div class="flex items-center justify-between text-sm font-medium">
    <span id={labelId}> {label} </span>
    <span>{Math.round(percentage)}</span>
  </div>
  <Progress.Root
    aria-labelledby={labelId}
    aria-valuetext={valueLabel}
    value={Math.round(tween.current ?? 0)}
    {min}
    max={classSize}
    class="bg-dark-10 shadow-mini-inset relative h-[15px] w-full overflow-hidden rounded-full"
  >
    <div
      class="h-full rounded-full bg-secondary-500 transition-transform shadow-sm"
      style="transform: translateX(-{100 - percentage}%)"
    ></div>
  </Progress.Root>
</div>
