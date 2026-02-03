<script lang="ts">
  import { Calendar } from "bits-ui";
  import CaretLeft from "phosphor-svelte/lib/CaretLeft";
  import CaretRight from "phosphor-svelte/lib/CaretRight";
  import {
    CalendarDate,
    getLocalTimeZone,
    today,
  } from "@internationalized/date";
  import type { DateValue } from "@internationalized/date";

  interface Props {
    value?: DateValue;
    minValue?: DateValue;
  }
  let { value = $bindable(), minValue }: Props = $props();
  let assignment = [
    { date: new CalendarDate(2025, 11, 30), name: "Intro to bio" },
    { date: new CalendarDate(2025, 11, 15), name: "Math HW" },
    { date: new CalendarDate(2025, 12, 5), name: "Essay Due" },
  ];
  function getAssignmentForDate(date: DateValue) {
    return assignment.find((assignment) => assignment.date.compare(date) === 0);
  }
  let currentAssignment = $derived(value ? getAssignmentForDate(value) : null);
</script>

<Calendar.Root
  {minValue}
  bind:value
  class="card inline-block border border-surface-200-800 bg-surface-50-950 shadow-xl mt-6 p-10"
  weekdayFormat="short"
  fixedWeeks={true}
  type="single"
>
  {#snippet children({ months, weekdays })}
    <Calendar.Header class="flex items-center justify-between">
      <Calendar.PrevButton
        class="btn-icon preset-filled-primary-500"
        title="Previous month"
        aria-label="Previous month"
      >
        <CaretLeft class="size-6" />
      </Calendar.PrevButton>
      <Calendar.Heading class="text-lg font-bold" />
      <Calendar.NextButton
        class="btn-icon preset-filled-primary-500"
        title="Next month"
        aria-label="Next month"
      >
        <CaretRight class="size-6" />
      </Calendar.NextButton>
    </Calendar.Header>
    <div
      class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
    >
      {#each months as month, i (i)}
        <Calendar.Grid class="w-full border-collapse select-none space-y-1">
          <Calendar.GridHead>
            <Calendar.GridRow class="mb-1 flex w-full justify-between">
              {#each weekdays as day, i (i)}
                <Calendar.HeadCell
                  class="text-surface-600-400 font-normal! w-10 rounded-md text-xs"
                >
                  <div>{day.slice(0, 2)}</div>
                </Calendar.HeadCell>
              {/each}
            </Calendar.GridRow>
          </Calendar.GridHead>
          <Calendar.GridBody>
            {#each month.weeks as weekDates, i (i)}
              <Calendar.GridRow class="flex w-full">
                {#each weekDates as date, i (i)}
                  {@const hasAssignment = getAssignmentForDate(date)}
                  <Calendar.Cell
                    {date}
                    month={month.value}
                    class="p-0! relative size-10 text-center text-sm"
                  >
                    <Calendar.Day
                      class="rounded hover:border-surface-200-800 data-selected:bg-foreground data-disabled:text-surface-600-400 data-selected:preset-filled data-unavailable:text-surface-600-400 data-disabled:pointer-events-none data-outside-month:pointer-events-none data-selected:font-medium data-unavailable:line-through group relative inline-flex size-10 items-center justify-center whitespace-nowrap border border-transparent bg-transparent p-0 text-sm font-normal"
                    >
                      <div
                        class="bg-foreground group-data-selected:bg-surface-50-950 group-data-today:block absolute top-[5px] hidden size-1 rounded-full"
                      ></div>
                      {date.day}
                      {#if hasAssignment}
                        <div
                          class="absolute bottom-[5px] size-1 rounded-full bg-black"
                        ></div>{/if}
                    </Calendar.Day>
                  </Calendar.Cell>
                {/each}
              </Calendar.GridRow>
            {/each}
          </Calendar.GridBody>
        </Calendar.Grid>
      {/each}
    </div>
  {/snippet}
</Calendar.Root>
{#if currentAssignment}
  <div class="mt-4 p-3 rounded-lg bg-background-alt border border-dark-10">
    <p class="text-sm font-medium">{currentAssignment.name}</p>
  </div>{/if}
