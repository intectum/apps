const renderLanguagesHTML = () => `
  <div is="intectum-home-languages" class="c-home-languages u-container u-fc u-justify--center u-gap">
    <h2>Languages</h2>
    <div class="u-g u-gap--lg">
      <div class="u-g8 u-fc u-gap">
        <div class="u-fr u-align--start u-gap">
          <div class="u-fc u-f1 u-gap">
            <h3>Bangalang</h3>
            <strong class="u-text-large">Created by me.</strong>
            <div>Compiled. Low level. Explicit. Procedural.</div>
            <div>Seamlessly shift your workloads between the CPU and GPU.</div>
          </div>
          <div class="u-fc u-f1 u-gap">
            <iframe
              src="https://www.youtube.com/embed/videoseries?si=76ApNnYIhhE1XX4O&amp;list=PLHIUSiAG6lLqw7Q80-v7QRXe1vd_IYRLc"
              title="YouTube video player"
              class="u-w--full u-aspect--16-9"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            >
            </iframe>
            <div class="u-text-small">Check out the playlist on YouTube</div>
          </div>
        </div>
        <div class="u-fc">
          <code class="c-tab-block__content u-p u-text-large">
<pre>
<span class="u-code-comment">// type alias</span>
<span class="u-code-keyword-2">vec3</span> = <span class="u-code-keyword-2">f32</span>[<span class="u-code-number">3</span>]

pos_array: <span class="u-code-keyword-2">vec3</span>[<span class="u-code-number">1000</span>]<span class="u-panel--invert" style="display: none;" data-section="gpu-code">@vram</span>
vel_array: <span class="u-code-keyword-2">vec3</span>[<span class="u-code-number">1000</span>]<span class="u-panel--invert" style="display: none;" data-section="gpu-code">@vram</span>

physics_kernel: (pos: ^<span class="u-code-keyword-2">vec3</span>, vel: ^<span class="u-code-keyword-2">vec3</span>, delta_time: <span class="u-code-keyword-2">f32</span>) =
{
  <span class="u-code-comment">// math operators work directly with arrays (SIMD)</span>
  pos += vel * delta_time
}

<span class="u-code-comment">// execute physics_kernel across <span data-section="cpu-code">CPU</span><span class="u-panel--invert" style="display: none;" data-section="gpu-code">GPU</span> cores concurrently</span>
<span class="u-code-keyword-4">#boomstick</span>(physics_kernel, ^pos_array, ^vel_array, <span class="u-code-number">0.016</span>)<span class="u-panel--invert" style="display: none;" data-section="gpu-code">@gpu</span>
</pre>
          </code>
          <div class="c-tab-block__tabs">
            <button
              type="button"
              class="c-tab-block__tab c-tab-block__tab--selected"
              data-action="set-tab"
              data-index="0"
            >
              CPU
            </button>
            <button
              type="button"
              class="c-tab-block__tab u-pulse"
              data-action="set-tab"
              data-index="1"
            >
              GPU
            </button>
          </div>
        </div>
      </div>
      <div class="u-g4 u-fc u-gap">
        <h3>Others</h3>
        <div class="u-text-large">A strong foundation allows me to express myself in many languages, taking advantage of their strengths and weaknesses.</div>
      </div>
    </div>
  </div>
`;

export default renderLanguagesHTML;
