<script lang="ts">
  import { CalendarDate, Time } from "@internationalized/date";
  import Progress from "$lib/components/progress.svelte";
  import AvailableAssignment from "$lib/components/availableAssignment.svelte";
  import TodaySchedule from "$lib/components/todaySchedule.svelte";
  import Calendar from "$lib/components/calendar.svelte";
  // Mock data for dashboard summary
  let averageGrade = 85;
  let assignmentsDueThisWeek = 3;
  let gradedThisWeek = 15;

  let assignments = [
    {
      date: new CalendarDate(2025, 11, 30),
      name: "Intro to bio",
      classSize: 30,
      subject: "science",
      submissionRate: 20,
      time: new Time(2),
      roomNumber: 301,
      teacher: "Mr Johnson",
    },
    {
      date: new CalendarDate(2025, 11, 15),
      name: "Math HW",
      classSize: 30,
      subject: "math",
      submissionRate: 30,
      time: new Time(11),
      roomNumber: 201,
      teacher: "Mr Johnson",
    },
    {
      date: new CalendarDate(2025, 12, 5),
      name: "Essay Due",
      classSize: 35,
      subject: "English",
      submissionRate: 30,
      time: new Time(9),
      roomNumber: 307,
      teacher: "Mr Johnson",
    },
  ];
</script>

<h1>Teacher Dashboard</h1>
<p>Welcome back! Here's what's happening with yout classes.</p>
<div class="info grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  <div class="card p-4 shadow-md rounded-lg">
    <h3 class="h3 mb-2">Average Class Grade</h3>
    <Progress
      value={averageGrade}
      classSize={100}
      label="Overall Average"
      valueLabel="{averageGrade}%"
    />
  </div>
  <div class="card p-4 shadow-md rounded-lg">
    <h3 class="h3 mb-2">Assignments Due Soon</h3>
    <p class="text-4xl font-bold">{assignmentsDueThisWeek}</p>
    <p class="text-sm">assignments due this week</p>
  </div>
  <div class="card p-4 shadow-md rounded-lg">
    <h3 class="h3 mb-2">Graded This Week</h3>
    <p class="text-4xl font-bold">{gradedThisWeek}</p>
    <p class="text-sm">assignments graded</p>
  </div>
</div>

<div class="flex flex-col lg:flex-row gap-4 rounded-lg p-4 shadow-sm">
  <div class="w-full lg:w-2/3 flex flex-col gap-4">
    <h2>Upcoming Assignments</h2>
    {#each assignments as a}
      <div class="rounded-lg p-4 shadow-sm border border-surface-200-800">
        <AvailableAssignment
          name={a.name}
          classSize={a.classSize}
          subject={a.subject}
          submissionRate={a.submissionRate}
          dueDate={a.date}
        />
      </div>
    {/each}

    <h2 class="mt-8">Today's Schedule</h2>
    {#each assignments as a}
      <div class="rounded-lg p-4 shadow-sm border border-surface-200-800">
        <TodaySchedule
          name={a.name}
          subject={a.subject}
          availability={a.time}
          roomNumber={a.roomNumber}
          classSize={a.classSize}
        />
      </div>
    {/each}
  </div>
  <div class="w-full lg:w-1/3 flex justify-center items-start xs:hidden">
    <Calendar />
  </div>
</div>
