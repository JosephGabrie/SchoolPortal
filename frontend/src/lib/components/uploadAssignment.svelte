<script lang="ts">
  import TimeField from "./TimeField.svelte";
  import { Time } from "@internationalized/date";
  import Calendar from "./calendar.svelte";
  import AssignmentUpload from "./FileUpload.svelte";
  import { Button } from "bits-ui";
  import { today, getLocalTimeZone } from "@internationalized/date";
  import type { DateValue } from "@internationalized/date";
  import type { TimeValue } from "bits-ui";
  const todayDate = today(getLocalTimeZone());
  let yesterday = $state(todayDate.subtract({ days: 1 }));

  let title = $state("");
  let type = $state("");
  let course = $state("");
  let instructions = $state("");
  let time = $state<TimeValue | undefined>(undefined);
  let pdf = $state("");
  let date = $state<DateValue | undefined>(undefined);
  let points = $state("");

  function handleSubmit() {
    console.log("Button Pressed");
    console.log({
      title,
      type,
      course,
      instructions,
      points,
      time: time ? time.toString() : "No Time Selected",
      date: date ? date.toString() : "No date selcted",
    });
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="mt-6 container mx-auto text-center">
    <h1>Hello</h1>
    <div class=" mt-6 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <label class="label">
        <span class="label-text"> Assignment Title</span>
        <input
          bind:value={title}
          class="input bg-gray-100"
          type="text"
          placeholder="e.g, Chapter 5 Problem Set"
          required
        />
        <!--
To do make sure to change make it sothat values change basede on teaching type and courses
-->
      </label>
      <label class="label">
        <span class="label-text">Assignment Type</span>
        <select bind:value={type} class="select" required>
          <option value="Hw">Hw</option>
          <option value="Quiz">Quiz</option>
          <option value="Exam">Exam</option>
          <option value="Project">Project</option>
          <option value="5">Option 5</option>
        </select>
      </label>
      <label class="label">
        <span class="label-text">Course</span>
        <select bind:value={course} class="select" required>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
          <option value="5">Option 5</option>
        </select>
      </label>
      <label class="label">
        <span class="label-text"> Instructions & description</span>
        <input
          bind:value={instructions}
          class="input"
          type="text"
          placeholder="Provide detailed instructions for students..."
          required
        />
      </label>
      <AssignmentUpload />
      <div class="text-left">
        <h1>Grading & Deadline</h1>
        <h2>Set point values and submission deadlines</h2>
      </div>
      <div class="flex items-center justify-center">
        <label class="label w-50 pr-4 pt-3 pb-3">
          <span class="label-text pb-1"> Total points </span>
          <input
            bind:value={points}
            class="input"
            type="text"
            placeholder="points"
            required
          />
        </label>
        <TimeField bind:value={time} placeholder={new Time(11, 59)} />
      </div>
      <div class="flex items-center justify-center mx-auto">
        <Calendar minValue={todayDate} bind:value={date} />
      </div>
      <Button.Root
        class="mt-5 rounded-input bg-dark text-background shadow-mini hover:bg-dark/95 inline-flex
	h-12 items-center justify-center px-[21px] text-[15px]
	font-semibold active:scale-[0.98] active:transition-all"
      >
        <p>Hello</p>
      </Button.Root>
    </div>
  </div>
</form>
