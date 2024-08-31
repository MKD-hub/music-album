import SongItem from "./components/SongItem"

function App() {

  return (
    <div>
      <div>

      </div>

      <section>
        {/* Filtering section, filter by genre or artist */}
        <div>
          <button>
              Pick Genre
          </button>

          <button>
              Pick Artist
          </button>
        </div>

        {/* List of Badges, that when pressed refetch songs of that genre / artist */}
      </section>

      <hr />

      <section>
        {/* Where the songs are listed */}
        <SongItem
          title="light switch"
          album="Bomb Rush Cyberfunk"
          genre="hip hop"
          artist="Navo the maestro"
        />
      </section>
    </div>
  )
}

export default App
