<template>
  <table class="table w-full text-sm table-compact">
    <tbody>
      <!-- row 1 -->
      <tr>
        <th>
          <div class="flex gap-4 items-center">
            <div class="btn btn-primary btn-circle btn-sm">
              <icon name="eva:paper-plane-outline" size="1.3em" />
            </div>
            Cy Ganderton
          </div>
        </th>
        <td>
          <div class="flex gap-x-2.5 items-center text-base-content-lighter">
            <div class="btn btn-ghost btn-circle btn-sm bg-base-200">
              <icon name="eva:calendar-outline" size="1.3em" />
            </div>
            21 Sep 2022
          </div>
        </td>
        <td>
          <span class="badge badge-ghost badge-sm"> Food </span>
        </td>
        <td class="text-right">
          {{
            new Intl.NumberFormat('ph-PH', {
              style: 'currency',
              currency: 'PHP',
            }).format(10.5)
          }}
        </td>
      </tr>
      <!-- row 2 -->
      <tr>
        <th>
          <div class="flex gap-4 items-center">
            <div class="btn btn-accent btn-circle btn-sm">
              <icon name="eva:undo-outline" size="1.3em" />
            </div>
            Hart Hagerty
          </div>
        </th>
        <td>
          <div class="flex gap-x-2.5 items-center text-base-content-lighter">
            <div class="btn btn-ghost btn-circle btn-sm bg-base-200">
              <icon name="eva:calendar-outline" size="1.3em" />
            </div>
            21 Sep 2022
          </div>
        </td>
        <td>
          <span class="badge badge-ghost badge-sm"> Food </span>
        </td>
        <td class="text-right">
          {{
            new Intl.NumberFormat('ph-PH', {
              style: 'currency',
              currency: 'PHP',
            }).format(10.5)
          }}
        </td>
      </tr>
      <!-- row 3 -->
      <tr>
        <th>
          <div class="flex gap-4 items-center">
            <div class="btn btn-primary btn-circle btn-sm">
              <icon name="eva:paper-plane-outline" size="1.3em" />
            </div>
            Brice Swyre
          </div>
        </th>
        <td>
          <div class="flex gap-x-2.5 items-center text-base-content-lighter">
            <div class="btn btn-ghost btn-circle btn-sm bg-base-200">
              <icon name="eva:calendar-outline" size="1.3em" />
            </div>
            21 Sep 2022
          </div>
        </td>
        <td>
          <span class="badge badge-ghost badge-sm"> Food </span>
        </td>
        <td class="text-right">
          {{
            new Intl.NumberFormat('ph-PH', {
              style: 'currency',
              currency: 'PHP',
            }).format(10.5)
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
