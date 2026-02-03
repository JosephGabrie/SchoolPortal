<script lang="ts">
  import { useQuery } from "$lib/convex-svelte.svelte";
  import AvailableAssignment from "$lib/components/availableAssignment.svelte";

  // Use the string path since _generated is not available yet
  const recentAssignments = useQuery("assignments:getRecent");
</script>

<div class="p-4 space-y-4">
  <h1 class="h1">Assignments</h1>
  
  {#if recentAssignments.isLoading}
    <p>Loading assignments...</p>
  {:else if recentAssignments.data}
    <div class="grid grid-cols-1 gap-4">
      {#each recentAssignments.data as assignment}
        <div class="card p-4">
          <h2 class="h3">{assignment.title}</h2>
          <p>{assignment.description || 'No description'}</p>
          <p class="text-sm opacity-60">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
          <div class="mt-2 badge preset-filled-secondary-500">{assignment.category}</div>
        </div>
      {/each}
      
      {#if recentAssignments.data.length === 0}
        <p>No recent assignments found.</p>
      {/if}
    </div>
  {:else if recentAssignments.error}
    <p class="text-error-500">Error loading assignments: {recentAssignments.error}</p>
  {/if}
</div>
