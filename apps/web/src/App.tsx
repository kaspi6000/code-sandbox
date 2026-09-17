import { Button, PopUp } from '@repo/ui'
import './App.css'

function App() {
  return (
    <>
      <section id="center">
        <Button
          onClick={() =>
            PopUp.open(() => (
              <div>
                hello pop up
                <Button
                  onClick={() => PopUp.open(() => <div>hello pop up 2</div>)}
                >
                  pop up new open
                </Button>
              </div>
            ))
          }
        >
          open
        </Button>
      </section>
    </>
  )
}

export default App
