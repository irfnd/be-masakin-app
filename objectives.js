const progress = [
  {
    task: "Flowchart Aplikasi",
    subTask: [],
    isOptional: false,
    isDone: null,
  },
  {
    task: "Table",
    subTask: ["Recipe", "User", "Comment"],
    isOptional: false,
    isDone: "✅",
  },
  {
    task: "CRUD",
    subTask: ["CREATE", "READ", "UPDATE", "DELETE"],
    isOptional: false,
    isDone: "✅",
  },
  {
    task: "Comment by resep",
    subTask: [],
    isOptional: true,
    isDone: "✅",
  },
  {
    task: "Resep by user",
    subTask: [],
    isOptional: true,
    isDone: "✅",
  },
  {
    task: "Pencarian Resep berdasarkan nama",
    subTask: [],
    isOptional: false,
    isDone: "✅",
  },
  {
    task: "Resep terbaru maksimal 5",
    subTask: [],
    isOptional: false,
    isDone: null,
  },
  {
    task: "Pagination",
    subTask: [],
    isOptional: true,
    isDone: null,
  },
  {
    task: "Linter",
    subTask: [],
    isOptional: false,
    isDone: "✅",
  },
  {
    task: "Error Handling",
    subTask: [],
    isOptional: false,
    isDone: "✅",
  },
  {
    task: "Cors",
    subTask: [],
    isOptional: false,
    isDone: "✅",
  },
  {
    task: "ENV",
    subTask: [],
    isOptional: false,
    isDone: "✅",
  },
  {
    task: "Dokumentasi Postman",
    subTask: [],
    isOptional: false,
    isDone: "✅",
  },
  {
    task: "Gunakan Bahasa Inggris untuk nama File dan Fungsi",
    subTask: [],
    isOptional: false,
    isDone: "✅",
  },
  {
    task: "Upload/push tugas kamu ke GitHub dan gunakan nama yang profesional",
    subTask: [],
    isOptional: false,
    isDone: null,
  },
  {
    task: "Dapat didemokan menggunakan postman",
    subTask: [],
    isOptional: false,
    isDone: "✅",
  },
  {
    task: "Presentasikan apa yang telah Anda lakukan dalam minggu ini",
    subTask: [],
    isOptional: false,
    isDone: null,
  },
  {
    task: "Jelaskan dengan bahasa kalian sendiri apa itu dan konsep tentang:",
    subTask: ["Node JS", "Express", "postgreSQL", "REST API"],
    isOptional: false,
    isDone: null,
  },

  {
    task: "Ceritakan dan Demokan tentang proyek ini",
    subTask: [],
    isOptional: false,
    isDone: null,
  },
];

const showProgress = (data) => {
  data.map((el) => {
    console.log(
      `> ${el.task}\n: ${el.isOptional ? "Optional" : "Required"}\n: ${
        el.isDone ? "✅" : "⚠️"
      }`
    );
    if (el.subTask.length !== 0) {
      el.subTask.map((el) => {
        console.log(` - ${el}`);
      });
    }
    console.log("");
  });
};

showProgress(progress);
