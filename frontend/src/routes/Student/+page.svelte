<script lang="ts">
  import Cards from "$lib/components/cards.svelte";
  // Example data

  let teacher1 = {
    name: "Dr. Sarah Johnson",
  };

  let teacher2 = {
    name: "Mr. Michael Chen",
  };

  let teacher3 = {
    name: "Prof. Emily Rodriguez",
  };
  let myClass = [
    {
      name: "Calculus I",
      teacher: teacher1,
      subject: "Mathematics",
      roomNumber: 301,
      classSize: 25,
    },

    {
      name: "Introduction to Biology",
      teacher: teacher2,
      subject: "Biology",
      roomNumber: 205,
      classSize: 30,
    },

    {
      name: "English Literature",
      teacher: teacher3,
      subject: "English",
      roomNumber: 102,
      classSize: 20,
    },
  ];
</script>

<div class="flex"></div>
<div class="flex gap-4">
  {#each myClass as CR}
    <div class="flex mt-4 items-center">
      <Cards
        name={CR.name}
        subject={CR.subject}
        roomNumber={CR.roomNumber}
        classSize={CR.classSize}
        teacher={CR.teacher}
      />
    </div>
  {/each}
</div>
