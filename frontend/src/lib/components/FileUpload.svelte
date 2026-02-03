<script lang="ts">
  import { FileUpload } from "@skeletonlabs/skeleton-svelte";

  let fileSize = 10000000;
  let maxFiles = 3;
  let fileNames = $state<string[]>([]);
</script>

<FileUpload
  onFileAccept={(details) => (fileNames = details.files.map((f) => f.name))}
  maxFileSize={fileSize}
  {maxFiles}
  accept=".pdf,.docx.,.pptx,.xlsx"
>
  <FileUpload.Label>Label</FileUpload.Label>
  <FileUpload.Dropzone>
    <FileUpload.Trigger>Browse Files</FileUpload.Trigger>
    <FileUpload.HiddenInput />
  </FileUpload.Dropzone>
  <FileUpload.ItemGroup>
    <FileUpload.Context>
      {#snippet children(fileUpload)}
        {#each fileUpload().acceptedFiles as file (file.name)}
          {#if file.size < 1000000}
            <FileUpload.Item {file}>
              <FileUpload.ItemName>{file.name}</FileUpload.ItemName>
              <FileUpload.ItemSizeText>
                {file.size} bytes
              </FileUpload.ItemSizeText>
              <FileUpload.ItemDeleteTrigger />
            </FileUpload.Item>
          {:else}
            <p class="text-red-600">File size is too big</p>
          {/if}
        {/each}
      {/snippet}
    </FileUpload.Context>
  </FileUpload.ItemGroup>
</FileUpload>
