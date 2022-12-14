<template>
  <input
    type="checkbox"
    id="add-expense-modal"
    class="modal-toggle"
    @click="toggleModal"
  />
  <label for="add-expense-modal" class="cursor-pointer modal" v-auto-animate>
    <label class="relative flex flex-col gap-2 modal-box" for="">
      <div>
        <label class="label">
          <span class="label-text">Payee</span>
        </label>
        <VueMultiselect
          v-model="payee"
          :searchable="false"
          :options="groupMembers"
          :close-on-select="false"
          :showNoResults="false"
          :showNoOptions="false"
          v-auto-animate
          placeholder="Payee"
          label="firstname"
          track-by="id"
        >
          <span slot="noResult"> No option found. </span>
        </VueMultiselect>
      </div>
      <div>
        <label class="label">
          <span class="label-text">Payor</span>
        </label>
        <VueMultiselect
          v-model="payors"
          :multiple="true"
          :searchable="false"
          :options="availablePayors"
          :close-on-select="false"
          :showNoResults="false"
          :showNoOptions="false"
          v-auto-animate
          placeholder="Payor"
          label="firstname"
          track-by="id"
        >
          <span slot="noResult"> No option found. </span>
        </VueMultiselect>
      </div>
      <div>
        <label class="label">
          <span class="label-text">Date</span>
        </label>
        <input
          v-model="date"
          type="date"
          placeholder="mm/dd/yyyy"
          class="w-full input input-bordered"
        />
      </div>
      <div class="flex gap-2">
        <div class="w-2/6">
          <label class="label">
            <span class="label-text">Item name</span>
          </label>
          <input
            v-model="name"
            type="text"
            placeholder="Yakult"
            class="w-full input input-bordered"
          />
        </div>
        <div class="w-1/6">
          <label class="label">
            <span class="label-text">Cost</span>
          </label>
          <input
            v-model="cost"
            type="text"
            placeholder="25"
            class="w-full input input-bordered"
          />
        </div>
        <div class="w-3/6 grow-0">
          <label class="label">
            <span class="label-text">Category</span>
          </label>
          <VueMultiselect
            v-model="categories"
            :options="availableCategories"
            :searchable="false"
            :multiple="true"
            :close-on-select="false"
            :showNoResults="false"
            :showNoOptions="false"
            v-auto-animate
            placeholder="Category"
            label="name"
            track-by="name"
          >
            <span slot="noResult"> No option found. </span>
          </VueMultiselect>
        </div>
      </div>
      <div>
        <t-rich-select
          multiple
          :close-on-select="false"
          :options="['Option A', 'Option B', 'Option C', 'Option D']"
          placeholder="Select multiple options"
          :value="['Option B', 'Option C']"
        />
      </div>
      <div class="modal-action">
        <label
          for="add-expense-modal"
          class="btn btn-sm btn-primary"
          @click="postExpense"
        >
          Create!
        </label>
      </div>
    </label>
  </label>
</template>

<script setup>
import VueMultiselect from 'vue-multiselect';

const props = defineProps({
  members: Array,
  categories: Array,
});

const { $toast } = useNuxtApp();

const name = ref('');
const cost = ref('');
const date = ref('');
const categories = ref([]);

const sourceCategory = ref(props.categories);

const availableCategories = computed(() => {
  const selectedCategoryNames = categories.value.map(
    (category) => category.name
  );
  const availableCategories = sourceCategory.value.filter(
    (category) => !selectedCategoryNames.includes(category.name)
  );
  return [...categories.value, ...availableCategories];
});

const payee = ref(null);
const payors = ref([]);
const groupMembers = ref(props.members);

const availablePayors = computed(() => {
  const selectedPayorNames = payors.value.map((member) => member.id);
  const availablePayors = groupMembers.value.filter(
    (member) => !selectedPayorNames.includes(member.id)
  );
  return [...payors.value, ...availablePayors];
});

const toggleModal = () => {
  name.value = '';
  cost.value = '';
  date.value = '';
  categories.value = [];
  payee.value = null;
  payors.value = [];
};

const postExpense = async () => {
  console.log('post expense');
  console.log({
    groupId: 1,
    name: name.value,
    cost: cost.value,
    date: date.value,
    categories: categories.value,
    payee: payee.value,
    payors: payors.value,
  });
  const expense = await useFetch('/api/expense', {
    method: 'POST',
    body: {
      groupId: 1,
      name: name.value,
      cost: cost.value,
      date: date.value,
      categories: categories.value,
      payee: payee.value,
      payors: payors.value,
    },
    initialCache: false,
  });
  console.log('expense posted');
};
</script>
