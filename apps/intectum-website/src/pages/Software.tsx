import { FC } from 'react';

const Software: FC = () =>
{
  return (
    <div className="o-container">
      <h1>open source software</h1>
      <h2>simplicity</h2>
      <p>simplicity is a game engine I am creating. It has the ambitious goal of being a simple game engine. Originally it was written in Java but I ported it to C++11. This engine was superceded by the GazEngine middleware I used for my projects at Media Design School where I could not use C++11. I have now taken the much more comprehensive and tested code from GazEngine back to simplicity and C++11 and continued to expand on it.</p>
      <blockquote className="u-color--primary">
        This project is currently undergoing restructuring to a more procedural, data-oriented, cache friendly and - of course - simpler design.
      </blockquote>
      <div className="o-grid">
        <a href="https://bitbucket.org/account/user/intectum/projects/SIM" target="_blank" rel="noreferrer" className="u-m--sm">Code</a>
        <a href="https://bitbucket.org/intectum/simplicity/wiki" target="_blank" rel="noreferrer" className="u-m--sm">Documentation</a>
      </div>
      <h3>Example</h3>
      <div>
        <code>
          <pre>
            {`#include <simplicity/API.h>
            
            using namespace simplicity;
            
            int main()
            {
              Simplicity::addEngine(...);
              Simplicity::getScene()->addEntity(...);
              Simplicity::play();
              return 0;
            }`}
          </pre>
        </code>
      </div>
      <h3>Features</h3>
      <div className="o-columns-3 o-columns--gutless">
        <div className="c-card u-m">
          <h4>Modular</h4>
          <p>Allows systems to be swapped in and out with minimal changes required e.g. swapping from Direct3D to OpenGL</p>
        </div>
        <div className="c-card u-m">
          <h4>Entities</h4>
          <p>Entities are constructed using composition, not inheritance to avoid class heirarchy explosions. Components are also interfaced to minimise dependencies on particular implementations</p>
        </div>
        <div className="c-card u-m">
          <h4>Input</h4>
          <p>Inputs from the mouse and keyboard are abstracted to allow swapping in and out of possible event sources e.g. swapping from FreeGLUT to GLFW</p>
        </div>
        <div className="c-card u-m">
          <h4>Logging</h4>
          <p>Logs to multiple resources with "printf" style formatting, severities and tags</p>
        </div>
        <div className="c-card u-m">
          <h4>Maths</h4>
          <p>Matrix and Vector implementations and other useful functions</p>
        </div>
        <div className="c-card u-m">
          <h4>Messaging</h4>
          <p>Messages are mediated to allow swapping in and out of possible message sources and destinations with minimal changes e.g. swapping from FreeGLUT to GLFW</p>
        </div>
        <div className="c-card u-m">
          <h4>Models</h4>
          <p>Provides functions for the creation of basic mesh shapes e.g. cubes</p>
        </div>
        <div className="c-card u-m">
          <h4>Resources</h4>
          <p>Resources (e.g. files) are abstracted to allow for different platforms and resource types</p>
        </div>
        <div className="c-card u-m">
          <h4>Scripting</h4>
          <p>Scripts can be written in C++ with callbacks for various lifecycle events</p>
        </div>
      </div>
      <h3>Modules</h3>
      <div className="o-columns-3 o-columns--gutless">
        <div className="c-card u-m">
          <h4>Bullet Physics</h4>
          <p>Simulates physics using <a href="http://bulletphysics.org/">Bullet Physics</a></p>
          <a href="https://github.com/simple-entertainment/simplicity-bullet" className="card-link">Github</a>
        </div>
        <div className="c-card u-m">
          <h4>CEF</h4>
          <p>Renders a web browser to a texture using <a href="https://bitbucket.org/chromiumembedded/cef">CEF (Chromium Embedded Framework)</a></p>
          <a href="https://github.com/simple-entertainment/simplicity-cef" className="card-link">Github</a>
        </div>
        <div className="c-card u-m">
          <h4>GLFW</h4>
          <p>Creates a <a href="http://www.glfw.org/">GLFW</a> window and acts as a message source for <a href="http://www.glfw.org/">GLFW</a> events</p>
          <a href="https://github.com/simple-entertainment/simplicity-glfw" className="card-link">Github</a>
        </div>
        <div className="c-card u-m">
          <h4>Live555</h4>
          <p>Streams textures using <a href="http://www.live555.com/liveMedia/">Live555 Streaming Media</a></p>
          <a href="https://github.com/simple-entertainment/simplicity-live555" className="card-link">Github</a>
        </div>
        <div className="c-card u-m">
          <h4>OpenGL</h4>
          <p>Renders models using <a href="https://www.opengl.org/">OpenGL 4</a></p>
          <a href="https://github.com/simple-entertainment/simplicity-opengl" className="card-link">Github</a>
        </div>
        <div className="c-card u-m">
          <h4>RakNet</h4>
          <p>Sends and receives messages over the network using <a href="http://www.jenkinssoftware.com/">RakNet</a></p>
          <a href="https://github.com/simple-entertainment/simplicity-raknet" className="card-link">Github</a>
        </div>
      </div>
    </div>
  );
};

export default Software;
