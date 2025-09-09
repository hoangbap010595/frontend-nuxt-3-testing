<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <div v-if="!product" class="text-center">Loading...</div>
    <div v-else class="grid gap-20 md:grid-cols-2">
      <ImageCarousel :images="images" @change="onImageChange" />

      <div class="flex flex-col gap-6">
        <h1 class="text-5xl font-normal text-[#231F20]">{{ product.name }}</h1>
        <p class="text-base font-normal text-[#231F20]">{{ product.description }}</p>

        <!-- Show Choose Options -->
        <div class="mt-6">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-[#231F20] text-xl font-normal uppercase whitespace-nowrap">Choose options</span>
            <hr class="flex-grow border-[#231F20]" />
          </div>
          <div v-for="type in optionTypes" :key="type.optionTypeId" class="p-4 cursor-pointer border border-[#0000001A]"
            @click="openModal(type.optionTypeId)">
            <div class="grid grid-cols-12 gap-2">
              <div class="col-span-4">
                <p class="font-semibold text-[#231F20] text-base">{{ type.displayName }}</p>
              </div>

              <div class="col-span-8">
                <p class="text-base font-normal text-[#231F20]">{{ selectedLabel(type.optionTypeId) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Show Price -->
        <div>
          <span class="text-[28px] font-semibold text-[#231F20]">${{ formatCents(totalPrice) }}</span>
        </div>

        <!-- Show Quantity and Add to Cart -->
        <div class="flex flex-col gap-2">
          <label for="qty" class="text-sm text-[#231F20]">Quantity</label>

          <div class="flex items-center gap-2">
            <div class="flex items-center border border-[#00000024] h-11">
              <button type="button" class="w-11 h-11 flex items-center justify-center cursor-pointer"
                @click="quantity > 1 && quantity--">
                <img src="/icons/minus.svg" alt="minus" class="w-6 h-6" />
              </button>

              <input id="qty" v-model.number="quantity" type="number" min="1" class="w-20 text-center p-2" />

              <button type="button" class="w-11 h-11 flex items-center justify-center cursor-pointer"
                @click="quantity++">
                <img src="/icons/plus.svg" alt="plus" class="w-6 h-6" />
              </button>
            </div>

            <button
              class="w-full bg-[#231F20] p-2 text-white h-11 uppercase flex items-center justify-center gap-2 cursor-pointer"
              @click="addToCart">
              <img src="/icons/basket-add.svg" alt="plus" class="w-6 h-6" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>


    <ConfigModal :open="modalOpen" :typeName="activeTypeName" :options="activeOptions" :selectedUid="activeSelectedUid"
      @update:selected="onUpdateSelected" @close="modalOpen = false" />
    <CustomToast ref="toastRef" />
  </div>
</template>


<script setup lang="ts">
import CustomToast from '~/components/shared/CustomToast.vue';
import ConfigModal from './DrawerOptions.vue';
import ImageCarousel from './ImageCarousel.vue';

const { data } = await useFetch('/api/product');
const payload = data.value;
const product = computed(() => payload?.product ?? null);
const optionTypes = computed(() => payload?.optionTypes ?? []);

const images = ref(['./images/image-1.png', '/images/image-2.png', '/images/image-3.png', '/images/image-4.png']);

const selectedMap = reactive<Record<number, string>>({});
optionTypes.value.forEach((t: any) => { if (t.options?.length) selectedMap[t.optionTypeId] = t.options[0].uid; });


const quantity = ref(1);
watch(quantity, (v) => { if (!v || v < 1) quantity.value = 1; });


const { formatCents } = useMoney();


const totalPrice = computed(() => {
  const sumOptions = optionTypes.value.reduce((acc: any, t: any) => {
    const uid = selectedMap[t.optionTypeId];
    const opt = t.options.find((o: any) => o.uid === uid);
    return acc + (opt?.price ?? 0);
  }, 0);

  return sumOptions * quantity.value;
});

// Modal state
const modalOpen = ref(false);
const activeTypeId = ref<number | null>(null);
const activeType = computed(() => optionTypes.value.find((t: any) => t.optionTypeId === activeTypeId.value) ?? null);
const activeTypeName = computed(() => activeType.value?.displayName ?? '');
const activeOptions = computed(() => activeType.value?.options ?? []);
const activeSelectedUid = computed(() => activeType.value ? selectedMap[activeType.value.optionTypeId] : '');


const openModal = (typeId: number) => { activeTypeId.value = typeId; modalOpen.value = true; };
const onUpdateSelected = (uid: string) => { if (activeType.value) selectedMap[activeType.value.optionTypeId] = uid };


const selectedLabel = (typeId: number) => {
  const t = optionTypes.value.find((x: any) => x.optionTypeId === typeId);
  if (!t) return 'Select';
  const found = t.options.find((o: any) => o.uid === selectedMap[typeId]);
  return found ? `${found.displayName} (+${formatCents(found.price)})` : 'Select';
}


// Toast
const toastRef = ref<any>(null);
const addToCart = () => { toastRef.value?.show('The product has been added to your cart'); };


const onImageChange = (_i: number) => { };
</script>


<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0
}

input[type="number"] {
  -moz-appearance: textfield
}
</style>