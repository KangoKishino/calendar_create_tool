<template>
    <div class="modal modal-overlay"  @click.self="$emit('close')">
        <div class="modal-window modal-content">
            <slot/>
        </div>
    </div>
</template>

<style>
.modal,
.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    width: auto;
  }

  .modal-window {
    border-radius: 4px;
    overflow: hidden;
  }
</style>