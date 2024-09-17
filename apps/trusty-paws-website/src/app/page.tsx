import { NextPage } from 'next';

import { Panel } from 'apps-web';

import { alt } from '../common/themes';

const Home: NextPage = () =>
  <>
    <Panel theme={alt} className="u-py--xl">
      <div className="o-container o-row">
        <div className="o-column u-center u-f1">
          <h1>Providing Trusted Pet Sitting Services in London</h1>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </div>
        </div>
        <div className="u-f1">
          <img src="https://placehold.co/600" alt="TODO" />
        </div>
      </div>
    </Panel>
    <div className="u-py--xl">
      <div className="o-container o-row">
        <div className="u-f1">
          <img src="https://placehold.co/600" alt="TODO" />
        </div>
        <div className="o-column u-center u-f1">
          <h2>Benefits (trust)</h2>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </div>
          <ul>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Lorem ipsum dolor sit amet</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="u-py--xl">
      <div className="o-container o-column">
        <h2>How it works</h2>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.
        </div>
        <div className="c-timeline">
          <div className="c-timeline__stop">
            <img className="c-timeline__image" src="https://placehold.co/150" alt="TODO"/>
            <div className="c-timeline__line">
              <div className="c-timeline__line-before"/>
              <div className="c-timeline__line-point"/>
              <div className="c-timeline__line-after"/>
            </div>
            <div className="c-timeline__detail">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
          </div>
          <div className="c-timeline__stop">
            <img className="c-timeline__image" src="https://placehold.co/150" alt="TODO"/>
            <div className="c-timeline__line">
              <div className="c-timeline__line-before"/>
              <div className="c-timeline__line-point"/>
              <div className="c-timeline__line-after"/>
            </div>
            <div className="c-timeline__detail">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
          </div>
          <div className="c-timeline__stop">
            <img className="c-timeline__image" src="https://placehold.co/150" alt="TODO"/>
            <div className="c-timeline__line">
              <div className="c-timeline__line-before"/>
              <div className="c-timeline__line-point"/>
              <div className="c-timeline__line-after"/>
            </div>
            <div className="c-timeline__detail">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
          </div>
          <div className="c-timeline__stop">
            <img className="c-timeline__image" src="https://placehold.co/150" alt="TODO"/>
            <div className="c-timeline__line">
              <div className="c-timeline__line-before"/>
              <div className="c-timeline__line-point"/>
              <div className="c-timeline__line-after"/>
            </div>
            <div className="c-timeline__detail">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
          </div>
        </div>
      </div>
    </div>
    <Panel theme={alt} className="u-py--xl">
      <div className="o-container o-column">
        <h2>Medium length section heading goes here</h2>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.
        </div>
        <button type="button" className="c-button c-button--primary">Do it!</button>
      </div>
    </Panel>
    <div className="u-py--xl">
      <div className="o-container u-fc u-text-center">
        <h2 className="u-pb--xl">Providing Trusted Pet Sitting Services in Greater London</h2>
        <div className="o-row">
          <div className="o-column">
            <h3>Flexible and personalised pet sitting solutions</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
          <div className="o-column">
            <h3>A home that is so clean, you won't even be able to tell that someone had stayed there when you
              return</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
          <div className="o-column">
            <h3>Turn your garden into a landscaped masterpiece</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
        </div>
      </div>
    </div>
    <Panel theme={alt} className="u-py--xl">
      <div className="o-container u-fc u-text-center">
        <h2 className="u-pb--xl">Customer Testimonials</h2>
        <div className="o-row">
          <div className="o-column">
            <blockquote>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </blockquote>
            <div>- Joe Bloggs</div>
          </div>
          <div className="o-column">
            <blockquote>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </blockquote>
            <div>- Joe Bloggs</div>
          </div>
          <div className="o-column">
            <blockquote>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </blockquote>
            <div>- Joe Bloggs</div>
          </div>
        </div>
      </div>
    </Panel>
    <div className="u-py--xl">
      <div className="o-container o-column">
        <h2 className="u-text-center">Contact Us</h2>
        <label>Name</label>
        <input />
        <label>Email</label>
        <input type="email" />
        <div className="o-row">
          <div className="o-column u-f1">
            <label>Start date</label>
            <input type="date" />
          </div>
          <div className="o-column u-f1">
            <label>End date</label>
            <input type="date" />
          </div>
        </div>
        <label>Message</label>
        <textarea rows={10} />
        <button type="button" className="c-button c-button--primary">Send</button>
      </div>
    </div>
  </>;

export default Home;
