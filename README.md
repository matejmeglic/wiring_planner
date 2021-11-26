          {this.data.windows.map((singleWindow, i) => (
            <DrawWindow
              windowWidth={window.innerWidth}
              windowHeight={window.innerHeight}
              data={this.data}
              singleWindow={singleWindow}
              i={i}
              settings={settings}
            />
          ))}
        </Layer>
