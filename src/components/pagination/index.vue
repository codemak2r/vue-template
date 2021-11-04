<template>
  <div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :total="total"
      :page-sizes="pageSizes"
      :page-count="pageCount"
      background
      :hide-on-single-page="true"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    pageCount: {
      type: Number,
      require: true,
    },
    limit: {
      type: Number,
      default: 20,
    },
    page: {
      type: Number,
      default: 1,
    },
    layout: {
      type: String,
      default: "prev, pager, next, jumper, ->, total",
    },
    total: {
      type: Number,
      require: true,
    },
    pageSizes: {
      type: Array,
      require: true,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
        this.$emit("pagination");
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
        this.$emit("pagination");
      },
    },
  },
};
</script>