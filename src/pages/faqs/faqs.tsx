import { Accordion } from '@metrostar/comet-uswds';
export const FAQs = () => {
  return (
    <>
      <div id="faqs" className="grid-container">
        <div className="grid-row">
          <div className="grid-col">
            <h1 className="margin-bottom-1">Frequently Asked Questions</h1>
            <div className="m-b-3">
              <p>
                Our Frequently Asked Questions (FAQ) page is a comprehensive
                resource to address common queries about our services and
                generative AI. We've curated a list of frequently encountered
                questions to provide quick and accurate solutions. Explore this
                page to enhance your understanding and make your experience
                smoother.
              </p>
            </div>
          </div>
        </div>

        <div className="grid-row">
          <div className="grid-col-2">
            <Accordion
              id="accordion-1"
              items={[
                {
                  children: (
                    <span>
                      <p>
                        <span>
                          Generative AI is a type of artificial intelligence
                          that can create new content,
                        </span>
                        <span> such as text,</span>
                        <span> images,</span>
                        <span> code,</span>
                        <span> or music.</span>
                        <span>
                          It does this by learning from a massive dataset of
                          existing content and using that knowledge to generate
                          new examples.
                        </span>
                      </p>
                    </span>
                  ),
                  expanded: true,
                  id: 'item-0',
                  label: 'What is generative AI?',
                },
                {
                  children: (
                    <span>
                      Generative AI models are trained on large datasets known
                      as large language models. Users prompt the application
                      with tasks or questions processed by the neural network or
                      model. The application then provides the most probable
                      results based on the request, and the user can provide
                      positive or negative feedback, which ultimately trains the
                      model to be even more effective
                    </span>
                  ),
                  expanded: false,
                  id: 'item-1',
                  label: 'How does generative AI work?',
                },
                {
                  children: (
                    <span>
                      Generative AI can increase efficiency and insight in many
                      ways, including summarizing large amounts of text in
                      articles and reports and brainstorming new ideas,
                      concepts, and outlines. Available tools can also provide
                      coding for scripts and simple programs, reformat text into
                      tables and bullet points, and analyze the sentiment of
                      text-based datasets such as reviews and survey results{' '}
                    </span>
                  ),
                  expanded: false,
                  id: 'item-2',
                  label:
                    'What are some common use cases for using generative AI tools?',
                },
                {
                  children: (
                    <span>
                      <p>
                        <span>
                          There are many different types of generative AI
                          models,
                        </span>
                        <span>
                          {' '}
                          each with its own strengths and weaknesses.
                        </span>
                        <span> Some common types include:</span>
                      </p>
                      <ul>
                        <span></span>
                        <li>
                          <strong>Large Language Models (LLMs):</strong>
                          <span>
                            {' '}
                            LLMs are trained on a massive dataset of text and
                            code.
                          </span>
                          <span> They can generate text,</span>
                          <span> translate languages,</span>
                          <span>
                            {' '}
                            write different kinds of creative content,
                          </span>
                          <span>
                            {' '}
                            and answer your questions in an informative way.
                          </span>
                        </li>
                        <span></span>
                        <li>
                          <strong>
                            Generative Adversarial Networks (GANs):
                          </strong>
                          <span>
                            {' '}
                            GANs are two neural networks that compete with each
                            other.
                          </span>
                          <span> One network,</span>
                          <span> the generator,</span>
                          <span>
                            {' '}
                            tries to create new content that is realistic,
                          </span>
                          <span> while the other network,</span>
                          <span> the discriminator,</span>
                          <span>
                            {' '}
                            tries to distinguish between real and generated
                            content.
                          </span>
                        </li>
                        <span></span>
                        <li>
                          <strong>Variational Autoencoders (VAEs):</strong>
                          <span>
                            {' '}
                            VAEs are a type of generative model that uses a
                            neural network to compress data into a
                            lower-dimensional space.
                          </span>
                          <span>
                            {' '}
                            This lower-dimensional space can then be used to
                            generate new data.
                          </span>
                        </li>
                        <span></span>
                      </ul>
                    </span>
                  ),
                  expanded: false,
                  id: 'item-3',
                  label:
                    'What are some of the different types of generative AI?',
                },
                {
                  children: (
                    <span>
                      <p>
                        <span>
                          Generative AI has a wide range of potential benefits,
                        </span>
                        <span> including:</span>
                      </p>
                      <ul>
                        <span></span>
                        <li>
                          <strong>Increased efficiency:</strong>
                          <span>
                            {' '}
                            Generative AI can automate many time-consuming
                            tasks,
                          </span>
                          <span> such as writing code,</span>
                          <span> generating marketing copy,</span>
                          <span> and creating design mockups.</span>
                        </li>
                        <span></span>
                        <li>
                          <strong>Improved creativity:</strong>
                          <span>
                            {' '}
                            Generative AI can help people come up with new ideas
                            and generate creative content that would be
                            difficult or impossible to create on their own.
                          </span>
                        </li>
                        <span></span>
                        <li>
                          <strong>Personalized experiences:</strong>
                          <span>
                            {' '}
                            Generative AI can be used to personalize experiences
                            for individual users.
                          </span>
                          <span> For example,</span>
                          <span>
                            {' '}
                            it can be used to generate personalized
                            recommendations,
                          </span>
                          <span> create custom content,</span>
                          <span> and provide tailored customer service.</span>
                        </li>
                        <span></span>
                      </ul>
                    </span>
                  ),
                  expanded: false,
                  id: 'item-4',
                  label:
                    'What are some of the benefits of using generative AI?',
                },
                {
                  children: (
                    <span>
                      <p>
                        <span>
                          Generative AI also has some potential risks,
                        </span>
                        <span> including:</span>
                      </p>
                      <ul>
                        <span></span>
                        <li>
                          <strong>Bias:</strong>
                          <span>
                            {' '}
                            Generative AI models can perpetuate bias that exists
                            in the data they are trained on.
                          </span>
                          <span>
                            {' '}
                            This can lead to unfair or discriminatory outcomes.
                          </span>
                        </li>
                        <span></span>
                        <li>
                          <strong>Misinformation:</strong>
                          <span>
                            {' '}
                            Generative AI can be used to create fake news
                            articles,
                          </span>
                          <span> social media posts,</span>
                          <span> and other forms of misinformation.</span>
                        </li>
                        <span></span>
                        <li>
                          <strong>Job displacement:</strong>
                          <span> Generative AI could automate many jobs,</span>
                          <span>
                            {' '}
                            leading to unemployment and economic hardship.
                          </span>
                        </li>
                        <span></span>
                      </ul>
                    </span>
                  ),
                  expanded: false,
                  id: 'item-5',
                  label:
                    'What are some of the risks associated with using generative AI?',
                },
                {
                  children: (
                    <span>
                      <p>
                        <span>
                          There are a number of things that can be done to
                          mitigate the risks of generative AI,
                        </span>
                        <span> including:</span>
                      </p>
                      <ul>
                        <span></span>
                        <li>
                          <strong>
                            Developing ethical guidelines for the use of
                            generative AI.
                          </strong>
                        </li>
                        <span></span>
                        <li>
                          <strong>
                            Creating diverse datasets that are representative of
                            the real world.
                          </strong>
                        </li>
                        <span></span>
                        <li>
                          <strong>
                            Monitoring the use of generative AI to identify and
                            address potential harms.
                          </strong>
                        </li>
                        <span></span>
                      </ul>
                    </span>
                  ),
                  expanded: false,
                  id: 'item-6',
                  label: 'How can we mitigate the risks of generative AI?',
                },
                {
                  children: (
                    <span>
                      <p>
                        <span>
                          Generative AI has a wide range of applications,
                        </span>
                        <span> including:</span>
                      </p>
                      <ul>
                        <span></span>
                        <li>
                          <strong>Content creation:</strong>
                          <span>
                            {' '}
                            Generative AI can be used to create a variety of
                            content,
                          </span>
                          <span> such as text,</span>
                          <span> images,</span>
                          <span> videos,</span>
                          <span> and music.</span>
                        </li>
                        <span></span>
                        <li>
                          <strong>Product design:</strong>
                          <span>
                            {' '}
                            Generative AI can be used to design new products and
                            services.
                          </span>
                        </li>
                        <span></span>
                        <li>
                          <strong>Drug discovery:</strong>
                          <span>
                            {' '}
                            Generative AI can be used to identify new drug
                            candidates.
                          </span>
                        </li>
                        <span></span>
                        <li>
                          <strong>Marketing and advertising:</strong>
                          <span>
                            {' '}
                            Generative AI can be used to create personalized
                            marketing campaigns and advertisements.
                          </span>
                        </li>
                        <span></span>
                        <li>
                          <strong>Customer service:</strong>
                          <span>
                            {' '}
                            Generative AI can be used to provide chatbots and
                            other forms of customer service.
                          </span>
                        </li>
                        <span></span>
                      </ul>
                    </span>
                  ),
                  expanded: false,
                  id: 'item-7',
                  label: 'What are some of the applications of generative AI?',
                },
                {
                  children: (
                    <span>
                      <p>
                        <span>
                          Generative AI is a rapidly evolving field with the
                          potential to revolutionize many industries.
                        </span>
                        <span> As the technology continues to develop,</span>
                        <span>
                          {' '}
                          we can expect to see even more innovative applications
                          of generative AI in the years to come.
                        </span>
                      </p>
                    </span>
                  ),
                  expanded: false,
                  id: 'item-8',
                  label: 'What is the future of generative AI?',
                },
              ]}
            />
          </div>
          <div className="grid-col-2">
            <Accordion
              id="accordion-1"
              items={[
                {
                  children: (
                    <span>
                      <p>
                        <span>
                          Some people worry that generative AI will eventually
                          become so good that it will replace humans in creative
                          jobs.
                        </span>
                        <span> However,</span>
                        <span>
                          {' '}
                          it is more likely that generative AI will be used to
                          augment human creativity,
                        </span>
                        <span>
                          {' '}
                          allowing people to create things that would be
                          impossible without the help of AI.
                        </span>
                      </p>
                    </span>
                  ),
                  expanded: false,
                  id: 'item-9',
                  label: 'Is generative AI a threat to human creativity?',
                },
                {
                  children: (
                    <span>
                      <p>
                        <span>
                          Some people worry that generative AI could become
                          powerful enough to take over the world.
                        </span>
                        <span> However,</span>
                        <span> this is highly unlikely.</span>
                        <span> Generative AI is a tool,</span>
                        <span> and like any tool,</span>
                        <span> it can be used for good or evil.</span>
                      </p>
                    </span>
                  ),
                  expanded: false,
                  id: 'item-10',
                  label: 'Will generative AI take over the world?',
                },
                {
                  children: (
                    <span>
                      <p>
                        The ownership of intellectual property rights to content
                        created by generative AI can be complex and depends on a
                        number of factors, such as who created the model, who
                        owns the data that the model was trained on, and how the
                        model was used to create the content.
                      </p>
                    </span>
                  ),
                  expanded: false,
                  id: 'item-11',
                  label:
                    'Who owns the intellectual property rights to the content created by generative AI?',
                },
                {
                  children: (
                    <span>
                      <p>
                        Some of the leading companies working on generative AI
                        include:
                      </p>
                      <ul>
                        <span></span>
                        <li>
                          <strong>OpenAI:</strong>
                          <span>
                            {' '}
                            OpenAI is a non-profit research company that
                            develops and promotes friendly AI.
                          </span>
                          <span>
                            {' '}
                            OpenAI is best known for its GPT-3 language model.
                          </span>
                        </li>
                        <span></span>
                        <li>
                          <strong>Google AI:</strong>
                          <span>
                            {' '}
                            Google AI is the artificial intelligence research
                            laboratory of Google.
                          </span>
                          <span>
                            {' '}
                            Google AI has developed a number of generative AI
                            models,
                          </span>
                          <span> including LaMDA and Imagen.</span>
                        </li>
                        <span></span>
                        <li>
                          <strong>DeepMind:</strong>
                          <span>
                            {' '}
                            DeepMind is an artificial intelligence research
                            laboratory owned by Google.
                          </span>
                          <span>
                            {' '}
                            DeepMind is best known for its AlphaStar AI,
                          </span>
                          <span>
                            {' '}
                            which defeated professional StarCraft II players.
                          </span>
                        </li>
                        <span></span>
                        <li>
                          <strong>Meta AI:</strong>
                          <span>
                            {' '}
                            Meta AI is the artificial intelligence research
                            laboratory of Meta Platforms.
                          </span>
                          <span>
                            {' '}
                            Meta AI has developed a number of generative AI
                            models,
                          </span>
                          <span> including Blender and Gato.</span>
                        </li>
                        <span></span>
                      </ul>
                    </span>
                  ),
                  expanded: false,
                  id: 'item-12',
                  label:
                    'Who are some of the leading companies working on generative AI?',
                },
                {
                  children: (
                    <span>
                      <p>
                        There are a number of ethical considerations surrounding
                        generative AI, including:
                      </p>
                      <ul>
                        <li>
                          <strong>Bias:</strong> As mentioned earlier,
                          generative AI models can perpetuate bias that exists
                          in the data they are trained on. This can lead to
                          unfair or discriminatory outcomes.
                        </li>
                        <li>
                          <strong>Privacy:</strong> Generative AI models can be
                          used to generate realistic but fake video and audio
                          recordings of people. This raises concerns about
                          privacy and the potential for misuse.
                        </li>
                        <li>
                          <strong>Deepfakes:</strong> Deepfakes are videos or
                          audio recordings that have been manipulated to make it
                          appear as if someone is saying or doing something they
                          never did. Deepfakes can be used to spread
                          misinformation and damage people's reputations.
                        </li>
                      </ul>
                    </span>
                  ),
                  expanded: false,
                  id: 'item-13',
                  label:
                    'What are some of the ethical considerations surrounding generative AI?',
                },
                {
                  children: (
                    <span>
                      <p>
                        There are a number of resources available to learn more
                        about generative AI, including:
                      </p>
                      <ul>
                        <li>
                          <strong>Blogs:</strong> Many companies and researchers
                          blog about generative AI. Some popular blogs include
                          the OpenAI blog, the Google AI blog, and the Meta AI
                          blog.
                        </li>
                        <li>
                          <strong>Books:</strong> There are a number of books
                          available about generative AI. Some popular books
                          include "Generative Deep Learning: Teaching Machines
                          to Paint, Write, and Play" by David Foster and
                          "Artificial Intelligence: A Modern Approach" by Stuart
                          Russell and Peter Norvig.
                        </li>
                        <li>
                          <strong>Online courses:</strong> There are a number of
                          online courses available about generative AI. Some
                          popular courses include "Deep Learning Specialization"
                          by Andrew Ng on Coursera and "Natural Language
                          Processing Specialization" by Stanford University on
                          Coursera.
                        </li>
                      </ul>
                    </span>
                  ),
                  expanded: false,
                  id: 'item-14',
                  label:
                    'What resources are available to learn more about generative AI?',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};
