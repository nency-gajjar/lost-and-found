<template>
  <div>
    <canvas
      ref="canvas"
      @pointerdown="mousedown"
      @pointerup="mouseup"
      @pointermove="mousemove"
      tabindex="1"
      @keyup.delete="deleteActives"
      :style="{
        maxWidth, maxHeight
      }"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: 'RedactImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    width: String,
    height: String,
    maxWidth: String,
    maxHeight: String,
  },
  data() {
    return {
      holding: false,
      drawing: false,
      moving: null,
      actives: [],
      rects: [],
      image: null,
    };
  },
  created() {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.addEventListener('load', this.imageLoaded, false);
    image.src = this.src;
    this.image = image;
  },
  mounted() {
    const { canvas } = this.$refs;
    canvas.style.touchAction = "none";
    if (this.width) {
      canvas.width = this.width;
    }
    if (this.height) {
      canvas.height = this.height;
    }
  },
  methods: {
    canvas() {
      return this.$refs.canvas;
    },
    imageLoaded() {
      const { canvas } = this.$refs;
      canvas.width = this.image.width;
      canvas.height = this.image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    },
    renderCanvas() {
      const { canvas } = this.$refs;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
      ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
      if (this.rects.length > 0) {
        this.rects.forEach(({ topLeft, width, height }) => {
          ctx.beginPath();
          ctx.rect(topLeft.x, topLeft.y, width, height);
          ctx.fillStyle = 'black';
          ctx.fill();
        });
      }
    },
    scaleOffsets(e) {
      const { canvas } = this.$refs;
      return {
        x: (e.offsetX / canvas.clientWidth) * canvas.width,
        y: (e.offsetY / canvas.clientHeight) * canvas.height,
      };
    },
    isWithinRect(e, rect) {
      function between(x, n, m) {
        if (n < m) {
          return x >= n && x <= m;
        }
        return x >= m && x <= n;
      }
      const { x, y } = this.scaleOffsets(e);
      return (
        between(x, rect.topLeft.x, rect.topLeft.x + rect.width) &&
        between(y, rect.topLeft.y, rect.topLeft.y + rect.height)
      );
    },
    getIntersectingRects(e) {
      return this.rects
        .map((rect, index) => ({ rect, index }))
        .filter(({ rect }) => this.isWithinRect(e, rect))
        .map(({ index }) => index);
    },
    mousedown(e) {
      this.holding = true;
      this.actives = this.getIntersectingRects(e);
      if (this.actives.length > 0) {
        this.moving = this.actives;
        return;
      }
      this.drawing = true;
      this.rects.push({
        topLeft: this.scaleOffsets(e),
        width: 0,
        height: 0,
      });
    },
    mousemove(e) {
      e.preventDefault();
      if (!this.holding) {
        return;
      }
      if (this.moving) {
        this.moving.forEach((index) => {
          this.rects[index].topLeft.x += e.movementX;
          this.rects[index].topLeft.y += e.movementY;
        });
        this.renderCanvas();
        return;
      }
      const { x, y } = this.scaleOffsets(e);
      const rect = this.rects[this.rects.length - 1];
      rect.width = x - rect.topLeft.x;
      rect.height = y - rect.topLeft.y;
      this.renderCanvas();
    },
    mouseup() {
      if (!this.holding) {
        return;
      }
      this.holding = false;
      this.drawing = false;
      this.moving = null;
      const last = this.rects[this.rects.length - 1];
      if (last.width === 0 || last.height === 0) {
        this.rects.pop();
      }
    },
    revert() {
      this.rects.pop();
      this.renderCanvas();
    },
    deleteActives() {
      if (this.actives.length === 0) {
        return;
      }

      this.rects = this.rects.filter(
        (rect, index) => !this.actives.includes(index)
      );
      this.renderCanvas();
    },
  },
};
</script>