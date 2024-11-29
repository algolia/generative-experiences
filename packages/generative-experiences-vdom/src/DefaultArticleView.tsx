/** @jsxRuntime classic */
/** @jsx createElement */

import { ContentClassNames, ContentViewProps, Renderer } from './types';
import { cx } from './utils';
import { Fragment } from 'react';

export function createArticleViewComponent({ createElement }: Renderer) {
  return function ArticleView(props: ContentViewProps<ContentClassNames>) {
    console.log('>>>>>>>>>>>>>>>>> view', props.item);
    if (props.item.type === 'comparison') {
      const { title, content, objects } = props.item;
      return (
        <article
          data-type="comparison"
          className={cx('ais-ShoppingGuideContent', props.classNames.container)}
        >
          <section
            className={cx(
              'ais-ShoppingGuideContent-contentSection',
              props.classNames.contentSection
            )}
          >
            <h2>{title}</h2>
            {content.map((section, i) => {
              const hit = objects.find((o) => o.objectID === section.objectID);
              const displayItem =
                section.type === 'product' && section.objectID;
              return (
                <section key={i}>
                  <h3>{section.title}</h3>
                  {hit && displayItem ? (
                    <props.itemComponent
                      hit={hit}
                      Fragment={Fragment}
                      createElement={createElement}
                    />
                  ) : null}
                  <p>{section.content}</p>
                  {section.type === 'product' && section.objectID ? (
                    <a
                      className={cx(
                        'ais-ShoppingGuideContent-productLink',
                        props.classNames.productLink
                      )}
                      href={props.getters.objectURL(section.objectID)}
                    >
                      View this product
                    </a>
                  ) : null}
                </section>
              );
            })}
          </section>
          <section
            className={cx(
              'ais-ShoppingGuideContent-relatedItemsSection',
              props.classNames.relatedItemsSection
            )}
          >
            <div
              className={cx(
                'ais-ShoppingGuideContent-relatedItemsTitle',
                props.classNames.relatedItemsTitle
              )}
            >
              <h3>Mentioned products</h3>
            </div>
            <div
              className={cx(
                'ais-ShoppingGuideContent-relatedItemsListContainer',
                props.classNames.relatedItemsListContainer
              )}
            >
              <ul
                className={cx(
                  'ais-ShoppingGuideContent-relatedItemsList',
                  props.classNames.relatedItemsList
                )}
              >
                {objects.map((hit) => (
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

    if (props.item.type === 'shopping_guide') {
      const { title, description, content, objects } = props.item;
      const image = props.getters.images(objects[0])[0];

      return (
        <article
          data-type="shopping_guide"
          className={cx('ais-ShoppingGuideContent', props.classNames.container)}
        >
          <section
            className={cx(
              'ais-ShoppingGuideContent-contentSection',
              props.classNames.contentSection
            )}
          >
            <h2>{title}</h2>
            <p>{description}</p>
            {image && (
              <img
                className={cx(
                  'ais-ShoppingGuideContent-heroImage',
                  props.classNames.heroImage
                )}
                src={image.src}
                alt={image.alt}
              />
            )}
            {content.map((section, i) => (
              <section key={i}>
                <h3>{section.title}</h3>
                <p>{section.content}</p>
              </section>
            ))}
          </section>
          <section
            className={cx(
              'ais-ShoppingGuideContent-relatedItemsSection',
              props.classNames.relatedItemsSection
            )}
          >
            <div
              className={cx(
                'ais-ShoppingGuideContent-relatedItemsTitle',
                props.classNames.relatedItemsTitle
              )}
            >
              <h3>Related products</h3>
            </div>
            <div
              className={cx(
                'ais-ShoppingGuideContent-relatedItemsListContainer',
                props.classNames.relatedItemsListContainer
              )}
            >
              <ul
                className={cx(
                  'ais-ShoppingGuideContent-relatedItemsList',
                  props.classNames.relatedItemsList
                )}
              >
                {objects.map((hit) => (
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

    if (props.item.type === 'category') {
      const { title, description, content, objects } = props.item;
      const image = props.getters.images(objects[0])[0];

      return (
        <article
          data-type="category"
          className={cx('ais-ShoppingGuideContent', props.classNames.container)}
        >
          <section
            className={cx(
              'ais-ShoppingGuideContent-contentSection',
              props.classNames.contentSection
            )}
          >
            <h2>{title}</h2>
            <p>{description}</p>
            {image && (
              <img
                className={cx(
                  'ais-ShoppingGuideContent-heroImage',
                  props.classNames.heroImage
                )}
                src={image.src}
                alt={image.alt}
              />
            )}
            {content.map((section, i) => (
              <section
                key={i}
                className={cx(
                  section.type === 'factor'
                    ? 'ais-ShoppingGuideContent-factorSection'
                    : '',
                  section.type === 'factor'
                    ? props.classNames.factorSection
                    : ''
                )}
              >
                {section.type === 'factor' && (
                  <div aria-hidden={true}>
                    <h3 style={{ textAlign: 'center' }}>✓</h3>
                  </div>
                )}
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.content}</p>
                </div>
              </section>
            ))}
          </section>
          <section
            className={cx(
              'ais-ShoppingGuideContent-relatedItemsSection',
              props.classNames.relatedItemsSection
            )}
          >
            <div
              className={cx(
                'ais-ShoppingGuideContent-relatedItemsTitle',
                props.classNames.relatedItemsTitle
              )}
            >
              <h3>Related products</h3>
            </div>
            <div
              className={cx(
                'ais-ShoppingGuideContent-relatedItemsListContainer',
                props.classNames.relatedItemsListContainer
              )}
            >
              <ul
                className={cx(
                  'ais-ShoppingGuideContent-relatedItemsList',
                  props.classNames.relatedItemsList
                )}
              >
                {objects.map((hit) => (
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
