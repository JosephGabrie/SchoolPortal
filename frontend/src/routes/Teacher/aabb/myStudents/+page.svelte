<script lang="ts">
  import myStudent from "$lib/mockdata/myStudents.json";
  let isAttendanceMode = $state(false);

  type StudentAttendance = {
    [key: string]: { attended: boolean };
  };
  const initialAttendance: StudentAttendance = myStudent.students.reduce(
    (acc, student) => {
      acc[student.name] = { attended: false };
      return acc;
    },
    {} as StudentAttendance,
  );
  let attendanceMap = $state(initialAttendance);
  function attendanceButton() {
    isAttendanceMode = !isAttendanceMode;

    if (isAttendanceMode) {
      Object.keys(attendanceMap).forEach((name) => {
        attendanceMap[name].attended = false;
      });
    }
  }

  function handleAttendanceClick(name: string) {
    if (isAttendanceMode) {
      attendanceMap[name].attended = !attendanceMap[name].attended;
    }
    console.log(
      `Student ${name} attendance status: ${attendanceMap[name].attended}`,
    );
  }

  function submitAttendance() {
    const attendanceReport = Object.entries(attendanceMap).reduce(
      (acc, [name, { attended }]) => {
        acc[name] = attended;
        return acc;
      },
      {} as { [key: string]: boolean },
    );
    console.log("Attendance Report:", attendanceReport);
    alert(
      `Attendance submitted!\n\n${JSON.stringify(attendanceReport, null, 2)}`,
    );
  }
  console.log(myStudent.title);
  function getGradeColor(grade: number): String {
    if (grade >= 90) {
      return "bg-success-300";
    } else if (grade >= 80) {
      return "bg-success-200";
    } else if (grade >= 70) {
      return "bg-warning-200";
    } else if (grade >= 60) {
      return "bg-warning-100";
    } else {
      return "bg-error-300 ";
    }
  }
</script>

<div class="p-4">
  <div class="mb-4 flex gap-2">
    <button
      onclick={attendanceButton}
      class="bg-error-400 text-white px-4 py-2 rounded hover:bg-error-500"
    >
      Toggle Attendance View (Currently: {isAttendanceMode
        ? "ATTENDANCE"
        : "GRADES"})
    </button>

    {#if isAttendanceMode}
      <button
        onclick={submitAttendance}
        class="bg-success-400 text-white px-4 py-2 rounded hover:bg-success-500"
      >
        Submit Attendance
      </button>
    {/if}
  </div>

  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 w-3xl">
    {#each myStudent.students as s}
      <button
        type="button"
        onclick={() => handleAttendanceClick(s.name)}
        disabled={!isAttendanceMode}
        class="w-full text-left p-2 border rounded-lg shadow-md disabled:opacity-100 {isAttendanceMode
          ? attendanceMap[s.name].attended
            ? 'bg-success-400 cursor-pointer hover:bg-success-300'
            : 'bg-surface-200 cursor-pointer hover:bg-surface-200'
          : getGradeColor(s.grade)}"
      >
        <p class="font-semibold">{s.name}</p>
        {#if !isAttendanceMode}
          <p>Grade: {s.grade}</p>
        {/if}
        {#if isAttendanceMode}
          <p class="text-sm">
            {attendanceMap[s.name].attended ? "✓ Present" : "Absent"}
          </p>
        {/if}
      </button>
    {/each}
  </div>
</div>
