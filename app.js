const PrintCard = document.querySelector(".PrintCard");
const formulario = document.querySelector("#formulario");

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(formulario);
  const [cancion] = [...formData.values()];

  fetchData(cancion);
  formulario.reset();
});

const fetchData = async (cancion) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": "ff481a78a2msh4196a63b4cb27c4p15dae2jsn72d9cdff93b9",
    },
  };

  try {
    const MusicData = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/search?q=${cancion}`,
      options
    );
    const res = await MusicData.json();

    let cancionesArr = res.data;
    cancionesCard(cancionesArr);
  } catch (error) {
    console.log(error);
  }
};

const cancionesCard = (cancionesArr) => {
  let htmlCanciones = "";

  cancionesArr.forEach((item) => {
    // console.log(item.title);
    // console.log(PrintCard)
    htmlCanciones += `<div class="card shadow p-3 mb-5 bg-body rounded" style="width: 18rem">
                                    <img src="${item.album.cover_medium}" class="card-img-top" alt="" />
                                    <div class="card-body">
                                        <h5 class="card-title">${item.title}</h5>
                                        <audio class="w-100" controls name="media">
                                            <source src="${item.preview}" type="audio/mpeg">
                                        </audio>
                                        <a href="${item.link}" target="_blank" class="btn btn-primary mt-2">Go somewhere</a>
                                    </div>
                                </div>`;
  });
  PrintCard.innerHTML = htmlCanciones;
};
