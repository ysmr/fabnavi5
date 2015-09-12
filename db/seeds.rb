# CC Lisences
%w(by by_sa by_nd by_nc by_nc_sa by_nc_nd).each do |name|
  Lisence.create name: name
end

tokens = [
  {
    "IiraXjGotDq1VHHx4oiacA" => {
      "token" => "$2a$10$z0wDSm6IWw2EjMUrRW8gAemp92wb0YHb8nWVxm12W8RA6Js8HVoxa",
      "expiry" => 1443243974,
      "last_token" => "$2a$10$V52QhHHXzM/JPeYMmkJ47u.lKzN8Cy.bdbli7A4T6onAvNZYfWD1a",
      "updated_at" => "2015-09-12T14:06:14.810+09:00"
    }
  },
  {
    "1E2cqbJxYbBb_gohA-qP1w" => {
      "token" => "$2a$10$uD28iGILzWC1wSkz9DwuQe7ap.zz/aPmeYI9J.A6jzEAB7xjYBYaq",
      "expiry" => 1443071103,
      "last_token" => "$2a$10$qZqwyOiSAGl/wyAFJiPE7.4qgdfc2iAcDHH1iJX/q7ANY4jnttW..",
      "updated_at"=>"2015-09-10T14:05:03.692+09:00"
    }
  }
]

tokens.each_with_index do |tok, i|
  # User
  u = User.create!(
    provider: "persona",
    uid: "user#{i}@example.com",
    password: "password",
    tokens: tok
  )

  5.times do |j|
    # Project
    p = u.projects.create!(
      name: "User#{i}'s Project#{j}",
      private: false,
      description: "This is the description of User#{i}'s Project#{j}. This is the description of User#{i}'s Project#{j}. This is the description of User#{i}'s Project#{j}.",
      lisence_id: 1,
      content_attributes: {
        type: "Content::PhotoList",
        description: "This is the description of the content of User#{i}'s Project#{j}. This is the description of the content of User#{i}'s Project#{j}. This is the description of the content of User#{i}'s Project#{j}."
      },
      tag_list: "tag1 tag2 tag3 tag4 tag5"
    )

    # Content
    p.content.update!(
      figures_attributes: [
        {type: "Figure::Photo"}, {type: "Figure::Photo"},
        {type: "Figure::Photo"}, {type: "Figure::Photo"},
        {type: "Figure::Photo"}, {type: "Figure::Photo"},
      ]
    )

    # Figure
    p.content.figures.each do |fig|
      u.attachments.create!(
        type: Attachment::Image.name,
        file: File.open(File.join(Rails.root, "app/assets/images/flower.jpg")),
        attachable_id: fig.id,
        attachable_type: fig.class.base_class.name
      )
    end
  end
end
