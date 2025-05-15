/** @jsxRuntime classic */
/** @jsx createElement */

import { ContentClassNames, ContentViewProps, Renderer } from './types';
import { cx } from './utils';

export function createArticleViewComponent({
  createElement,
  Fragment,
}: Renderer) {
  return function ArticleView(props: ContentViewProps<ContentClassNames>) {
    if (props.item.objectID === 'default' || props.error) {
      return (
        <div
          className={cx(
            'ais-GuideContentError',
            props.classNames?.errorContainer
          )}
        >
          <h3
            className={cx(
              'ais-GuideContentErrorTitle',
              props.classNames?.errorContainerTitle
            )}
          >
            We Hit a Snag!
          </h3>
          <p>
            Our system encountered an unexpected error. Don&apos;t worry,
            it&apos;s not your fault. Please try again later.
          </p>
        </div>
      );
    }

    if (props.item.type === 'comparison') {
      const { objectID, title, content, objects } = props.item;
      const image = props.getters.images(objects[0])[0];

      return (
        <article
          data-type="comparison"
          className={cx('ais-GuideContent', props.classNames?.container)}
        >
          <section
            className={cx(
              'ais-GuideContent-contentSection',
              props.classNames?.contentSection
            )}
          >
            <h2>{title}</h2>
            {image && (
              <img
                className={cx(
                  'ais-GuideContent-heroImage',
                  props.classNames?.heroImage
                )}
                src={image.src}
                alt={image.alt}
              />
            )}
            {content.map((section, i) => {
              return (
                <div key={i}>
                  {section.type === 'introduction' && (
                    <div
                      className={cx(
                        'ais-GuideContent-introSection',
                        props.classNames?.introSection
                      )}
                    >
                      <p>{section.content}</p>
                    </div>
                  )}
                  {section.type === 'factors' && (
                    <div
                      className={cx(
                        'ais-GuideContent-factorsSection',
                        props.classNames?.factorsSection
                      )}
                    >
                      <h3>{section.title}</h3>
                      <ul
                        className={cx(
                          'ais-GuideContent-factorsList',
                          props.classNames?.factorsList
                        )}
                      >
                        {section.content.map((factor, index) => (
                          <li
                            key={index}
                            className={cx(
                              'ais-GuideContent-factorItem',
                              props.classNames?.factorItem
                            )}
                          >
                            <h4>{factor.name}</h4>
                            <p>{factor.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {section.type === 'product' && (
                    <div
                      className={cx(
                        'ais-GuideContent-productSection',
                        props.classNames?.productSection
                      )}
                    >
                      <h3>{section.title}</h3>
                      <props.itemComponent
                        hit={objects.find(
                          (o) => o.objectID === section.objectID
                        )}
                        Fragment={Fragment}
                        createElement={createElement}
                      />
                      {typeof section.content === 'string' && (
                        // provide backwards compatibility with the comparison guides that are not generated with the new structure
                        <p>{section.content}</p>
                      )}
                      <p>
                        {typeof section.content !== 'string'
                          ? section.content?.find(
                              (item) => item.type === 'description'
                            )?.content ?? ''
                          : ''}
                      </p>
                      <ul
                        className={cx(
                          'ais-GuideContent-productFactorsList',
                          props.classNames?.productFactorsList
                        )}
                      >
                        {typeof section.content !== 'string'
                          ? section.content
                              ?.find((item) => item.type === 'product_factors')
                              ?.content?.map((factor, index) => (
                                <li key={index}>
                                  <h4>{factor.name}</h4>
                                  <p>{factor.description}</p>
                                </li>
                              )) ?? ''
                          : ''}
                      </ul>
                    </div>
                  )}
                  {(section.type === 'conclusion' ||
                    section.type === 'feature') && (
                    <div
                      className={cx(
                        'ais-GuideContent-articleContentSection',
                        props.classNames?.articleContentSection
                      )}
                    >
                      <h3>{section.title}</h3>
                      <p>{section.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
          {props.showFeedback && (
            <props.feedbackComponent
              castFeedback={props.castFeedback}
              objectIDs={[objectID]}
              voteTarget="content"
              alreadyCast={props.alreadyCast}
              createElement={createElement}
              Fragment={Fragment}
            />
          )}
        </article>
      );
    }

    if (
      props.item.type === 'category' ||
      props.item.type === 'shopping_guide'
    ) {
      const { objectID, title, content, objects } = props.item;
      const image = props.getters.images(objects[0])[0];

      return (
        <article
          data-type="guide"
          className={cx('ais-GuideContent', props.classNames?.container)}
        >
          <section
            className={cx(
              'ais-GuideContent-contentSection',
              props.classNames?.contentSection
            )}
          >
            <h2>{title}</h2>
            {image && (
              <img
                className={cx(
                  'ais-GuideContent-heroImage',
                  props.classNames?.heroImage
                )}
                src={image.src}
                alt={image.alt}
              />
            )}
            {content.map((section, i) => (
              <div key={i}>
                {section.type === 'introduction' && (
                  <div
                    className={cx(
                      'ais-GuideContent-introSection',
                      props.classNames?.introSection
                    )}
                  >
                    <p>{section.content}</p>
                  </div>
                )}
                {section.type === 'factors' && (
                  <div
                    className={cx(
                      'ais-GuideContent-factorsSection',
                      props.classNames?.factorsSection
                    )}
                  >
                    <h3>{section.title}</h3>
                    <ul
                      className={cx(
                        'ais-GuideContent-factorsList',
                        props.classNames?.factorsList
                      )}
                    >
                      {section.content.map((factor, index) => (
                        <li
                          key={index}
                          className={cx(
                            'ais-GuideContent-factorItem',
                            props.classNames?.factorItem
                          )}
                        >
                          <h4>{factor.name}</h4>
                          <p>{factor.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {!section.type && (
                  // provide backwards compatibility with the shopping guides that are not generated with the new structure
                  <div
                    className={cx(
                      'ais-GuideContent-articleContentSection',
                      props.classNames?.articleContentSection
                    )}
                  >
                    <h3>{section.title}</h3>
                    <p>{section.content}</p>
                  </div>
                )}
                {(section.type === 'factor' ||
                  section.type === 'conclusion') && (
                  <div
                    className={cx(
                      'ais-GuideContent-articleContentSection',
                      props.classNames?.articleContentSection
                    )}
                  >
                    <h3>{section.title}</h3>
                    <p>{section.content}</p>
                  </div>
                )}
              </div>
            ))}
          </section>
          {props.showFeedback && (
            <props.feedbackComponent
              castFeedback={props.castFeedback}
              objectIDs={[objectID]}
              voteTarget="content"
              alreadyCast={props.alreadyCast}
              createElement={createElement}
              Fragment={Fragment}
            />
          )}
          <section
            className={cx(
              'ais-GuideContent-relatedItemsSection',
              props.classNames?.relatedItemsSection
            )}
          >
            <div
              className={cx(
                'ais-GuideContent-relatedItemsTitle',
                props.classNames?.relatedItemsTitle
              )}
            >
              <h3>{props.featuredItemsTitle}</h3>
            </div>
            <div
              className={cx(
                'ais-GuideContent-relatedItemsListContainer',
                props.classNames?.relatedItemsListContainer
              )}
            >
              <ul
                className={cx(
                  'ais-GuideContent-relatedItemsList',
                  props.classNames?.relatedItemsList
                )}
              >
                {objects?.slice(0, 4)?.map((hit) => (
                  <li key={hit.objectID}>
                    <props.itemComponent
                      hit={hit}
                      Fragment={Fragment}
                      createElement={createElement}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>
      );
    }

    return null;
  };
}
