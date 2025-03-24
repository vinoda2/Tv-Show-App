async function loadSchedule() {
  try {
    const response = await fetch('https://api.tvmaze.com/schedule');
    const data = await response.json();

    const container = document.getElementById('schedule-container');
    container.innerHTML = ''; 

    data.forEach(item => {
      const show = item.show;
      const image = show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image';
      const summary = show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'No summary available';

      const cardHTML = `
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <img src="${image}" class="card-img-top" alt="${show.name}">
            <div class="card-body">
              <h5 class="card-title">${show.name}</h5>
              <p><strong>Episode:</strong> ${item.name}</p>
              <p><strong>Airdate:</strong> ${item.airdate} at ${item.airtime}</p>
              <p class="card-text">${summary}</p>
            </div>
            <div class="card-footer text-end">
              <a href="${show.url}" target="_blank" class="btn btn-primary btn-sm">More Info</a>
            </div>
          </div>
        </div>
      `;

      container.insertAdjacentHTML('beforeend', cardHTML);
    });

  } catch (error) {
    console.error('Error fetching schedule:', error);
    document.getElementById('schedule-container').innerHTML = `
      <div class="alert alert-danger">Failed to load schedules. Please try again later.</div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', loadSchedule);
