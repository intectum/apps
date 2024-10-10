import { NextPage } from 'next';

import { Link, Panel } from 'apps-web';

import Events from './Events';
import Quote from './Quote';

const Home: NextPage = () =>
  <div className="o-page o-column">
    <header>
      <Panel theme="stone" invert>
        <div className="o-container u-py">
          <img src="/logo.png" alt="OSHO" />
          <h1>Information Center</h1>
          Auckland, New Zealand
        </div>
      </Panel>
    </header>

    <main className="o-container o-column u-f1">
      <section>
        <Quote />
      </section>

      <section className="o-column">
        <h2>OSHO Active Meditations</h2>

        <p>Everyone is welcome to come and experience OSHO's active meditations! They are designed to help modern people enter into meditation. To learn more, see <Link href="https://www.osho.com/meditation/osho-active-meditations/why-active-meditations">Why active meditations?</Link> We host meditations at a few locations so make sure you come to the right one :P</p>

        <p><strong><em>Please arrive ten minutes before the meditation starts. It is best to join the mailing list (below) so that we can notify you if we have a cancellation.</em></strong></p>

        <h3>This week's meditations</h3>

        <Events />
      </section>

      <section className="o-column">
        <h2>Got questions? Want to join the mailing list?</h2>

        <p>Don't hesitate to contact Gyan at <Link href="mailto:info@osho.nz">info@osho.nz</Link>. For more information about Osho, you can also go to <Link href="https://www.osho.com">www.osho.com</Link>.</p>
      </section>
    </main>

    <footer>
      <Panel theme="stone" invert>
        <div className="o-container u-py">
          <div>
            <small>
              OSHO is a registered trademark of Osho International Foundation, used with permission, <Link theme="stone" href="https://www.osho.com/trademarks">www.osho.com/trademarks</Link>
            </small>
          </div>
          <div>
            <small>
              Some material used here (images and text excerpts) is Copyright &copy; OSHO International Foundation, <Link theme="stone" href="https://www.osho.com/copyright">www.osho.com/copyright</Link>
            </small>
          </div>
        </div>
      </Panel>
    </footer>
  </div>;

export default Home;
