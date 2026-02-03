<script lang="ts">
  import Progress from "./progress.svelte";
  let { name, subject, submissionRate, classSize, dueDate }: App.Info =
    $props();
</script>

<div class="flex w-lg justify-start">
  <div class="w-xs px-4">
    <h1>{name} | {subject}</h1>
    <h1 class="">
      {submissionRate} / {classSize}
    </h1>
    <h1>Due: {dueDate}</h1>
  </div>
  <Progress
    value={submissionRate}
    {classSize}
    label="Submission Progress"
    valueLabel="{submissionRate}/{classSize} submitted"
  />
</div>
