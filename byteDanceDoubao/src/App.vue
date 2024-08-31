<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">
      <RouterView />
    </div>
  </header>
  <footer>
  </footer>
</template>
<style>
.footer{
  /* 吸底 */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* 背景色 */
  background-color: #f5f5f5;
  /* 文字颜色 */
  color: #333;
  /* 文字大小 */
  font-size: 12px;
  /* 文字居中 */
  text-align: center;
  /* 边框 */
  border-top: 1px solid #ccc;
  /* 内边距 */
  padding: 10px 0;
  /* 宽度 */
  width: 100%;
}
</style>
