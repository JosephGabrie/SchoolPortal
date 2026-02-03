<script lang="ts">
  let { name, subject, availability, roomNumber, classSize }: App.Availability =
    $props();
</script>

<div class="w-lg">
  <h1>{name} | {subject}</h1>
  <p>
    {availability.hour}:{String(availability.minute).padStart(2, "0")}
  </p>
  <p>Room # {roomNumber}</p>
  <p>Students: {classSize}</p>
</div>
