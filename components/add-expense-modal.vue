<template>
  <input type="checkbox" id="add-expense-modal" class="modal-toggle" />
  <label for="add-expense-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
      <div>
        <label class="label">
          <span class="label-text">Item name</span>
        </label>
        <input
          type="text"
          placeholder="(e.g. Yakult)"
          class="input input-bordered w-full"
        />
      </div>
      <div>
        <label class="label">
          <span class="label-text">Cost</span>
        </label>
        <input
          type="text"
          placeholder="(e.g. 25)"
          class="input input-bordered w-full"
        />
      </div>
      <div>
        <label class="label">
          <span class="label-text">Item name</span>
        </label>
        <input
          type="text"
          placeholder="(e.g. Yakult)"
          class="input input-bordered w-full"
        />
      </div>
      <div class="modal-action">
        <label for="add-expense-modal" class="btn">Yay!</label>
      </div>
    </label>
  </label>
</template>
