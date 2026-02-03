<script lang="ts">
  import MultipleChoice from "./multipleChoice.svelte";

  type Question = {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
  };

  let questions = $state<Question[]>([]);
  function addQuestion() {
    questions = [
      ...questions,
      {
        id: crypto.randomUUID(),
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 1,
      },
    ];
  }
  function deleteQuestion(id: string) {
    questions = questions.filter((q) => q.id !== id);
  }
  function submit() {
    if (questions.length === 0) {
      alert("Please add at least one question");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      if (!q.question.trim()) {
        alert(`please fill in the question text for Question ${i + 1}`);
        return;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          alert(`Please fill in Option ${j + 1} for Question ${i + 1}`);
          return;
        }
      }
    }
    console.log($state.snapshot(questions));
    alert("Quiz submitted succesfully!");
  }
</script>

<div class="flex-col justify-center p-6">
  <h2 class="text-xl font-bold mb-4 flex justify-center">Create a Quiz</h2>
  {#each questions as question, i (question.id)}
    <div class="relative mb-4">
      <MultipleChoice
        index={i}
        bind:question={question.question}
        bind:options={question.options}
        bind:problem_number={question.correctAnswer}
        onDelete={() => deleteQuestion(question.id)}
      />
    </div>
  {/each}
  <button
    onclick={addQuestion}
    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    Add Questions</button
  >
  <button
    onclick={submit}
    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
  >
    submit
  </button>
</div>
