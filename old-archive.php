<?php
/*
* Include the Post-Type-specific template for the content.
* If you want to override this in a child theme, then include a file
* called content-___.php (where ___ is the Post Type name) and that will be used instead.
*/
?>
<a href="<?php the_permalink(); ?>">
    <?php if (has_post_thumbnail() && get_post_type() != 'calendario') : ?>

        <div class="archive-post-thumbnail">
            <?php the_post_thumbnail('thumbnail'); ?>
        </div>

    <?php endif; ?>



    <div class="archive-entry-content">
        <?php if (get_post_type() != 'calendario') : ?>

            <h2 class="archive-entry-title">
                <?php the_title(); ?>
            </h2>

        <?php endif; ?>




        <?php
        //Si es un item de agenda

        if (get_post_type() == 'calendario') :
            get_template_part('parts/event-data');
        endif;

        ?>



    </div>

</a>