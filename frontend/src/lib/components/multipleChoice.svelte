<script lang="ts">
  import FileUpload from "./FileUpload.svelte";
  let {
    index,
    problem_number = $bindable(),
    onDelete,
    question = $bindable(),
    options = $bindable(),
  } = $props<{
    index: number;
    question: string;
    options: string[];
    problem_number: number;
    onDelete: () => void;
  }>();
  function addOption() {
    options = [...options, ""];
  }
  function removeOption(optionIndex: number) {
    if (options.length <= 2) return;
    options = options.filter((_: string, i: number) => i !== optionIndex);

    if (problem_number > options.length) {
      problem_number = 1;
    }
  }
</script>

<div class="p-4 border rounded-lg bg-white shadow relative">
  <button
    class="absolute top-2 right-2 text-red-500 hover:text-red-700"
    onclick={onDelete}
  >
    X
  </button>
  <input
    class="mb-2"
    type="text"
    placeholder={"Question " + (index + 1)}
    bind:value={question}
    required
  />
  <form class="space-y-2">
    {#each options as option, i}
      <div class="flex items-center space-x-2">
        <input
          class="radio"
          type="radio"
          name="radio-{index}"
          value={i + 1}
          bind:group={problem_number}
        />
        <input
          class="input"
          type="text"
          placeholder="Option {i + 1}"
          bind:value={options[i]}
          required
        />
        {#if options.length > 2}
          <button
            type="button"
            class="text-red-500 hover:text-red-700 px-2"
            onclick={() => removeOption(i)}
          >
            x
          </button>
        {/if}
      </div>
    {/each}
    <button
      type="button"
      class="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 text-sm"
      onclick={addOption}
      >+ Add Option
    </button>
  </form>
</div>

<!-- 
<div class="flex items-center space-x-2">
      <input
        class="radio"
        type="radio"
        name="radio-{index}"
        value={2}
        bind:group={problem_number}
      />
      <input
        class="input"
        type="text"
        placeholder="Option 2"
        bind:value={options[1]}
      />
    </div>
    <div class="flex items-center space-x-2">
      <input
        class="radio"
        type="radio"
        name="radio-{index}"
        value={3}
        bind:group={problem_number}
      />
      <input
        class="input"
        type="text"
        placeholder="Option 3"
        bind:value={options[2]}
      />
    </div>
    <div class="flex items-center space-x-2">
      <input
        class="radio"
        type="radio"
        name="radio-{index}"
        value={4}
        bind:group={problem_number}
      />
      <input
        class="input"
        type="text"
        placeholder="Option 4"
        bind:value={options[3]}
      />
    </div>

  </form>
</div>
-->
