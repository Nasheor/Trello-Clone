import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "task";
    }
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: "task", params: { id: task.id } });
    },
    close() {
      this.$router.push({ name: "board" });
    },
    createTask(e, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: e.target.value
      });
      e.target.value = "";
    },
    createColumn(e, columns) {
      this.$store.commit("CREATE_COLUMN", {
        columns,
        name: e.target.value
      });
      e.target.value = "";
    },
    pickupTask(e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.dropEffect = "move";

      e.dataTransfer.setData("from-task-index", taskIndex);
      e.dataTransfer.setData("from-column-index", fromColumnIndex);
      e.dataTransfer.setData("type", "task");
    },
    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.setData("from-column-index", fromColumnIndex);
      e.dataTransfer.setData("type", "column");
    },
    dropColumnOrTask(e, toTasks, toColumnIndex) {
      // console.log(e);
      const fromColumnIndex = e.dataTransfer.getData("from-column-index");
      const type = e.dataTransfer.getData("type");
      if (type === "task") {
        const fromTasks = this.board.columns[fromColumnIndex].tasks;
        const taskIndex = e.dataTransfer.getData("from-task-index");

        this.$store.commit("MOVE_TASK", {
          fromTasks,
          toTasks,
          taskIndex
        });
      } else {
        this.$store.commit("MOVE_COLUMN", {
          fromColumnIndex,
          toColumnIndex
        });
      }
    }
  }
};
